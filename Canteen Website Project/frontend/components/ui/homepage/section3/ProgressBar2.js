import { useRouter } from "next/router";

export default function ProgressBarStep({ step }) {
  const router = useRouter();
  const data = [
    {
      id: 1,
      name: "Pesan Makanan",
      href: "/#Categories",
    },
    {
      id: 2,
      name: "Pesan Kursi",
      href: "/pesan-kursi",
    },
    {
      id: 3,
      name: "Pembayaran",
      href: "#",
    },
    {
      id: 4,
      name: "Konfirmasi",
      href: "#",
    },
  ];

  return (
    <div class="stepper-wrapper">
      {data.map(({ id, name, href }) => (
        <div
          key={id}
          class={`stepper-item ${
            id < step ? "completed" : id == step ? "active" : ""
          }`}
        >
          <button
            disabled={id > step}
            onClick={() => id < step && router.push(href)}
            class="step-counter"
          >
            {id}
          </button>
          <div class="step-name">{name}</div>
        </div>
      ))}
      {/* <div class="stepper-item completed">
        <div class="step-counter">1</div>
        <div class="step-name">Pesan Makanan</div>
      </div>
      <div class="stepper-item active">
        <div class="step-counter">2</div>
        <div class="step-name">Pesan Kursi</div>
      </div>
      <div class="stepper-item">
        <div class="step-counter">3</div>
        <div class="step-name">Pembayaran</div>
      </div>
      <div class="stepper-item">
        <div class="step-counter">4</div>
        <div class="step-name">Konfirmasi</div>
      </div> */}
    </div>
  );
}
