import Link from "next/link";

export default function ResetSection() {
  return (
    <section>
      <div className="mx-auto flex h-screen justify-evenly font-poppins">
        <div class="flex h-screen w-2/6">
          <div class="my-auto w-full ">
            <div className="h-3/6 rounded-2xl bg-gradient-to-t from-orange-500 to-orange-600 px-16 py-14 shadow-2xl md:filter-none">
              <h2 className={`mb-4 text-left text-5xl font-bold text-white`}>
                Reset Password
              </h2>
              <div class=" cursor-default text-xl">
                Masukkan email yang anda gunakan untuk mendaftar
              </div>
              <form>
                <div className="text-1xl py-4">
                  <input
                    className="w-full rounded-2xl py-2 px-5 shadow-md"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
              </form>
              <Link href="/resetconfirm">
                <button
                  type="Log In"
                  class="mt-3 w-full rounded-2xl bg-orange-600 py-2 px-4 font-bold  text-white shadow-md hover:bg-orange-700"
                >
                  Reset Password
                </button>
              </Link>
              <div class="mt-7 cursor-pointer font-semibold hover:underline">
                <Link href="/login">Kembali ke Login</Link>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
