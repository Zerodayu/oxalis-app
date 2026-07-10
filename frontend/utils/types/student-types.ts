export interface Student {
  avatar?: string;
  data: { section: string; timein: string; timeout: string };
  id: string;
  initials?: string;
  name: string;
}

export const user = {
  name: "testUser",
  email: "testuser@email.com",
  avatar: "avatar",
};

export const studentLists = [
  {
    id: "1",
    name: "Alex Johnson",
    data: { section: "saging", timein: "9:06am", timeout: "4:28pm" },
  },
  {
    id: "2",
    name: "Sarah Chen",
    data: { section: "saging", timein: "9:14am", timeout: "4:37pm" },
  },
];
