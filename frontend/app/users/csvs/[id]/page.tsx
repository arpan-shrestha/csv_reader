import UsersCsvsDetails from "@/container/UsersCsvsDetails";

export default async function UsersCsvsDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <UsersCsvsDetails id={id} />;
}
