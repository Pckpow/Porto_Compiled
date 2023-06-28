import Image from "next/image";
export default function LoginSection() {
  return (
    <section>
      <div className="mx-auto flex h-screen justify-evenly px-16 font-poppins">
        <div className="mt-20 text-center">
          <h2 className={`text-8xl font-bold`}>Welcome!</h2>
          <Image width={800} height={800} src="/loginfood.svg" />
        </div>
        <div class="flex h-screen">
          <div class="m-auto">
            <div className="m-auto rounded-3xl bg-orange-500 py-16 px-16 text-center shadow-2xl">
              <h2 className={`mb-8 bg-orange-500 text-left text-4xl font-bold`}>
                Member Login
              </h2>
              <form>
                <div className="text-1xl py-3">
                  <h2 class="py-2 text-left text-xl font-bold">Email</h2>
                  <input
                    className="w-5/6  rounded-2xl py-2 px-5"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="py-3">
                  <h2 class="py-2 text-left text-xl font-bold">Password</h2>
                  <input
                    className="w-5/6 rounded-2xl py-2 px-5"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="Log In"
                  class="w-5/6 rounded-2xl bg-orange-600 py-2 px-4  font-bold text-white hover:bg-orange-700"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
