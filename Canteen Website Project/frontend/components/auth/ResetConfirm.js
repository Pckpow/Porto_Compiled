import Link from "next/link";

export default function ResetConfirm() {
  return (
    <section>
      <div className="mx-auto flex h-screen justify-evenly font-poppins">
        <div class="flex h-screen w-2/6">
          <div class="my-auto w-full ">
            <div className="h-3/6 rounded-2xl bg-gradient-to-t from-orange-500 to-orange-600 px-16 py-14 shadow-2xl md:filter-none">
              <h2 className={`mb-4 text-left text-5xl font-bold text-white`}>
                Reset Password
              </h2>
              <div class="mb-4 cursor-default text-xl">
                Silakan cek email anda, anda akan mendapatkan email dengan
                instruksi langkah-langkah untuk mereset password anda.
              </div>
              <Link href="/login">
                <button class="mt-4 w-full rounded-2xl bg-orange-600 py-2 px-4 font-bold  text-white shadow-md hover:bg-orange-700">
                  Kembali ke Login
                </button>
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
