import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function InvitationAcceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("access-token")?.value;
  console.log(token);
  if (!token) redirect("/login");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/invitations/${id}/accept`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    redirect("/projects");
  }
  const { projectId } = (await res.json()) as { projectId: number };

  console.log(`프로젝트아이디: ${projectId}`);
  redirect(`/projects/${projectId}`);
}
