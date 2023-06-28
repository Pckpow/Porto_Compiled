import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../context/user/userContext";

export default function LoginSection() {
  const { dispatch: dispatchUser } = useContext(UserContext);

  return (
    <section>
      <div className="mx-auto flex h-screen justify-evenly  font-poppins">
        <div class="flex h-screen w-2/6">
          <div class="my-auto w-full ">
            <div className="h-3/6 rounded-2xl bg-gradient-to-t from-orange-500 to-orange-600 px-16 py-14 shadow-2xl md:filter-none">
              <h2 className={`mb-4 text-left text-5xl font-bold text-white`}>
                Member Login
              </h2>
              <form>
                <div className="text-1xl py-4">
                  <h2 class="py-2 text-left text-xl font-bold">Email</h2>
                  <input
                    className="w-full rounded-2xl py-2 px-5 shadow-md"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <h2 class="py-2 text-left text-xl font-bold">Password</h2>
                  <input
                    className="w-full rounded-2xl py-2  px-5 shadow-md"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </form>
              <div class="flex justify-start">
                <label class=" block flex items-center">
                  <input
                    class="top-0 leading-loose text-pink-600"
                    type="checkbox"
                  />
                  <span class="text-regular ml-2">Remember me</span>
                </label>
              </div>
              <Link href="/">
                <button
                  onClick={() => {
                    // dispatch({ type: "CLICK" });
                    dispatchUser({
                      type: "SIGN_IN",
                      payload: { name: "Konang" },
                    });
                  }}
                  type="Log In"
                  class="mt-3 w-full rounded-2xl bg-orange-600 py-2 px-4 font-bold  text-white shadow-md hover:bg-orange-700"
                >
                  Login
                </button>
              </Link>
              <div class="mt-7 cursor-pointer hover:underline" href="#">
                <Link href="/reset">Lupa password?</Link>
              </div>
              <div
                class="mt-7 cursor-pointer font-semibold  hover:underline"
                href=""
              >
                <Link href="/signup">Daftar sekarang!</Link>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
