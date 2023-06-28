import React from "react";
import Layout from "../components/layout/Layout";
import ProgressBarStep from "../components/ui/homepage/section3/ProgressBar2";

function Invoice() {
  return (
    <Layout withoutFooter={true} withoutNavbar={true}>
      <section className="mx-auto flex max-w-8xl flex-col pt-12">
        {/* Progress Bar */}
        <div className="mx-auto w-8/12">
          <ProgressBarStep step={4} />
        </div>
        {/* Invoice */}
        <div className="final-order">
          <h1 className="pt-5 pb-10 text-4xl">
            {" "}
            Pesanan anda sudah berhasil diterima
          </h1>
          <div className="check-box">✓</div>
          <div className="text-center text-lg">
            <h2 className="pt-10">Terimakasih untuk pembeliannya !</h2>
            <h3>Order ID anda adalah : 1234567890 </h3>
            <h3>Invoice akan dikirimkan ke email anda</h3>
          </div>
          <button className="invoice-button p-20">Kembali ke Menu</button>
        </div>
      </section>
    </Layout>
  );
}

export default Invoice;
