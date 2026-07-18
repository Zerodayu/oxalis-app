import { db } from "@drizzle";
import { section, student, attendance } from "@drizzle/schema";
import { eq, and, inArray } from "drizzle-orm";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CODE_LENGTH = 6;
const MAX_RETRIES = 5;

// Match this to the actual unique constraint name on `section.classCode`
const CLASS_CODE_UNIQUE_CONSTRAINT = "section_class_code_unique";

type Section = typeof section.$inferSelect;

function generateClassCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return code;
}

function isClassCodeCollision(error: unknown): boolean {
  const err = error as { code?: string; constraint?: string } | undefined;
  return err?.code === "23505" && err?.constraint === CLASS_CODE_UNIQUE_CONSTRAINT;
}

function isForeignKeyViolation(error: unknown): boolean {
  return (error as any)?.code === "23503";
}

// Matches YYYY-MM-DD strictly (basic sanity check, not full calendar validation)
const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Returns "today" in a specific timezone, formatted as YYYY-MM-DD.
 * Avoids the bug where `new Date().toISOString()` uses UTC and can be
 * off-by-one-day for users outside UTC (e.g. UTC+8 in the early morning).
 */
function getTodayInTimezone(timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()); // en-CA locale formats as YYYY-MM-DD
}

// Set this to your app's actual operating timezone
const APP_TIMEZONE = "Asia/Manila";

export class SectionService {
  async createSection(data: { name: string; teacherId: number }): Promise<Section> {
    let lastError: unknown;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const [newSection] = await db
          .insert(section)
          .values({
            name: data.name,
            classCode: generateClassCode(),
            teacherId: data.teacherId,
          })
          .returning();
        return newSection;
      } catch (error) {
        if (isClassCodeCollision(error)) {
          lastError = error;
          console.warn(
            `Class code collision on attempt ${attempt + 1}/${MAX_RETRIES}, retrying...`
          );
          continue;
        }
        if (isForeignKeyViolation(error)) {
          throw new Error(`Invalid teacherId: ${data.teacherId} does not exist`);
        }
        throw error;
      }
    }

    throw lastError;
  }

  async getTeacherSections(teacherId: number, date?: string) {
    // Authorization note: callers must ensure the requesting user is
    // permitted to view this teacherId's data (e.g. is this teacher,
    // or an admin) before invoking this method.

    if (date && !DATE_FORMAT.test(date)) {
      throw new Error(`Invalid date format: expected YYYY-MM-DD, got "${date}"`);
    }

    const targetDate = date || getTodayInTimezone(APP_TIMEZONE);

    const sections = await db.query.section.findMany({
      where: eq(section.teacherId, teacherId),
      orderBy: (s, { asc }) => [asc(s.name)],
    });

    const sectionIds = sections.map((s) => s.id);
    const students =
      sectionIds.length > 0
        ? await db.query.student.findMany({
          where: inArray(student.sectionId, sectionIds),
          orderBy: (s, { asc }) => [asc(s.name)],
        })
        : [];

    const studentIds = students.map((s) => s.id);
    const todayAttendance =
      studentIds.length > 0
        ? await db.query.attendance.findMany({
          where: and(
            inArray(attendance.studentId, studentIds),
            eq(attendance.date, targetDate)
          ),
        })
        : [];

    const attendanceByStudentId = new Map(
      todayAttendance.map((a) => [a.studentId, a])
    );

    return sections.map((sec) => ({
      id: sec.id,
      name: sec.name,
      classCode: sec.classCode,
      createdAt: sec.createdAt,
      students: students
        .filter((s) => s.sectionId === sec.id)
        .map((s) => {
          const a = attendanceByStudentId.get(s.id);
          return {
            id: s.id,
            name: s.name,
            gender: s.gender,
            attendanceToday: a ? { timeIn: a.timeIn, timeOut: a.timeOut } : null,
          };
        }),
    }));
  }
}
