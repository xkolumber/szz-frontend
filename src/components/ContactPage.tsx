import ButtonWithArrowLeft from "./ButtonWithArrowLeft";

const ContactPage = () => {
  return (
    <div className="own_edge min-h-screen relative overflow-hidden">
      <div className="main_section !pt-8">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <h2 className="uppercase text-center">Kontakt</h2>
        <p>
          Bratislava - vidiek, Malacky - Pomoravie, Dunajská Streda, Galanta,
          Komárno, Levice, Nitra, Nové Zámky, Senica, Topoľčany, Trenčín, Nové
          Mesto nad Váhom, Trnava, Piešťany, Banská Bystrica, Čadca, Dolný
          Kubín, Liptovský Mikuláš, Lučenec, Martin, Považská Bystrica,
          Prievidza, Rimavská Sobota, Zvolen, Žiar n./Hronom, Žilina, Veľký
          Krtíš, Bardejov, Humenné, Košice - vidiek, Michalovce, Poprad, Prešov,
          Rožňava, Spišská Nová Ves, Trebišov, Stará Ľubovňa, Svidník, Vranov
          nad Topľou, Ružomberok, Partizánske.
        </p>
      </div>
      <img
        src={"/icons/icon_contact_left.svg"}
        className="absolute h-[578px] w-[373px] -left-40 top-[40%] hidden 3xl:block"
      />
      <img
        src={"/icons/icon_contact_right.svg"}
        className="absolute h-[578px] w-[373px] -right-40 top-[20%] hidden 3xl:block"
      />
    </div>
  );
};

export default ContactPage;
