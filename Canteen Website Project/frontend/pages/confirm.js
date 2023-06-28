import Layout from "../components/layout/Layout";
import ProgressBarStep from "../components/ui/homepage/section3/ProgressBar2";

function Confirm() {
  return (
    <Layout withoutFooter={true}>
      <section className="mx-auto max-w-8xl pt-12">
        <div className="flex items-center justify-between">
          {/* Text Konfirmasi Pesanan */}
          <div className="w-2/12 text-5xl font-bold">Konfirmasi Pesanan</div>
          {/* Progress Bar */}
          <div className="relative -mb-5 flex w-8/12 items-center justify-center">
            <ProgressBarStep step={4} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Sisi Kiri */}
          <div>
            {/* Text Konfirmasi Pesanan */}
            <div className="text-3xl font-bold">Konfirmasi Pesanan</div>
          </div>
          {/* List Menu */}
          <div></div>
        </div>
      </section>
    </Layout>
  );
}

export default Confirm;
