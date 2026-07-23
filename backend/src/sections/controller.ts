import { Elysia, t } from "elysia";
import { SectionService } from "./service";
import { sectionModel } from "./model";
import { authPlugin } from "../auth/controller";
import { requireTeacherPlan } from "@lib/guard";

const service = new SectionService();

export const sectionRoutes = new Elysia({ prefix: "sections", tags: ["Sections"] })
  .use(authPlugin)
  .get(
    "/",
    async ({ session, query, set }) => {
      const denied = requireTeacherPlan(session, set);
      if (denied) return denied;

      return await service.getTeacherSections(Number(session.user.id), query.date);
    },
    {
      auth: true,
      query: sectionModel.dateQuery,
      response: sectionModel.teacherSectionsResponse,
      detail: { description: "Get all sections with students and attendance for a date (teacher only, defaults to today)" },
    },
  )
  .post(
    "/",
    async ({ body, session, set }) => {
      const denied = requireTeacherPlan(session, set);
      if (denied) return denied;

      return await service.createSection({
        ...body,
        teacherId: Number(session.user.id),
      });
    },
    {
      auth: true,
      body: sectionModel.createSectionBody,
      response: {
        200: sectionModel.createSectionResponse,
        403: t.Object({ error: t.String() }),
      },
      detail: { description: "Create a new section (teacher only)" },
    },
  );
