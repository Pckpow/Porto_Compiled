import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../context/user/userContext";

export default function Footer({ isFixed }) {
  const { state } = useContext(UserContext);
  const { dispatch: dispatchUser } = useContext(UserContext);

  return (
    <navbar>
      <div
        className={`${
          isFixed ? "fixed" : ""
        } z-50 flex h-[100px] w-full items-center justify-between rounded-b-3xl bg-orange-500 px-10 drop-shadow-lg`}
      >
        <div className="">
          <Link href="/">
            <Image
              width={60}
              height={60}
              src="/konangkonang2.png"
              alt="Navbar Logo"
            />
          </Link>
        </div>

        {state.isLogin ? (
          <div
            onClick={() => dispatchUser({ type: "SIGN_OUT" })}
            className="flex flex-wrap items-center justify-between rounded-full px-4 py-1 hover:bg-orange-300"
          >
            <div>
              <Image
                width={50}
                height={50}
                src="/loginlogo.svg"
                alt="Login Logo"
              />
            </div>
            <div className="ml-3 font-poppins text-lg font-bold">
              {state.user.name}
            </div>
          </div>
        ) : (
          <Link href="/login">
            <div className="flex flex-wrap items-center justify-between rounded-full px-4 py-3 hover:bg-orange-300">
              <div>
                <Image
                  width={50}
                  height={50}
                  src="/loginlogo.svg"
                  alt="Login Logo"
                />
              </div>
              <div className="ml-3 font-poppins text-lg font-bold">Login</div>
            </div>
          </Link>
        )}
      </div>
    </navbar>
  );
}
