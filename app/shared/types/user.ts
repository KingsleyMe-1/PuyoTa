export interface Profile {
  fullName: string | null;
  role: "tenant" | "landlord";
  idVerified: boolean;
  avatarUrl: string | null;
  email: string;
}
