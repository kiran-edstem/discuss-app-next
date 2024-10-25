import { signIn, signOut } from "@/actions";
import { auth } from "@/auth";
import ProfilePage from "@/components/profile";
import { Button } from "@nextui-org/button";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <form action={signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
      {
        session?.user ? <div>{JSON.stringify(session.user)}</div> : <div>Signed OUT</div>
      }
      <ProfilePage />
    </div>
  );
}
