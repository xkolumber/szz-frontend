import ButtonWithArrowLeft from "./ButtonWithArrowLeft";

const ContactPage = () => {
  return (
    <div className="own_edge min-h-screen relative overflow-hidden">
      <div className="main_section !pt-8 contact_page">
        <ButtonWithArrowLeft title="Domovská stránka" link={`/`} />
        <div className="max-w-[900px] m-auto mt-8">
          <h2 className="uppercase text-center">Kontakt</h2>
          <img
            width={120}
            height={120}
            src={"/kontakt.jpg"}
            className="mt-4 mb-4 cursor-pointer w-full h-full object-cover rounded-[16px] max-h-[369px]"
          />
          <h5 className="upperecase">Ako sa k nám dostanete</h5>

          <iframe
            title="Bratislava Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10706.218176607592!2d17.0986359!3d48.1566009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8bfdb8b3c737%3A0xca68190e08a57721!2sSlovensk%C3%BD%20zv%C3%A4z%20z%C3%A1hradk%C3%A1rov%20%E2%80%93%20Republikov%C3%BD%20v%C3%BDbor!5e0!3m2!1ssk!2ssk!4v1699213019176!5m2!1ssk!2ssk"
            allowFullScreen={true}
            loading="lazy"
            className="rounded-[16px] w-full h-[400px]"
          ></iframe>

          <h5 className="upperecase">Organizačná štruktúra</h5>
          <p>
            Slovenský zväz záhradkárov Republikový výbor, občianske združenie
          </p>
          <p>Sídlo: Havlíčkova 1476/34, 817 02 Bratislava - Staré Mesto</p>
          <p>IČO 00178152</p>

          <p className="pt-2">www.zvazzahradkarov.sk</p>
          <p>telefón: 02 /207 071 76, 02/207 071 77, 02/547 710 41</p>
          <h5 className="upperecase">E-mail adresy:</h5>
          <p>info@szz.eu.sk</p>
          <p>tajomnik@szz.eu.sk</p>
          <p>oro@szz.eu.sk</p>
          <h5 className="upperecase">
            Predseda szz rv, o.z.: Ing. Eduard Jakuber
          </h5>
          <p>e-mail: eduardjakubek@gmail.com</p>
          <h5 className="upperecase">Tajomník SZZ RV, o.z. : Juraj Korček</h5>
          <p>e-mail: tajomnik@szz.eu.sk</p>
          <h5 className="upperecase">Pracovníci</h5>
          <p>Juraj KORČEK, tajomník SZZ RV, o.z.</p>
          <p>p. Eva SENEŠIOVÁ, sekretariát</p>
          <p>Ing. Anna SZABÓOVÁ, vedúca organizačného oddelenia</p>
          <h5 className="upperecase">OKRESNÉ VÝBORY, SÍDLO:</h5>
          <p>
            Bratislava - vidiek, Malacky - Pomoravie, Dunajská Streda, Galanta,
            Komárno, Levice, Nitra, Nové Zámky, Senica, Topoľčany, Trenčín, Nové
            Mesto nad Váhom, Trnava, Piešťany, Banská Bystrica, Čadca, Dolný
            Kubín, Liptovský Mikuláš, Lučenec, Martin, Považská Bystrica,
            Prievidza, Rimavská Sobota, Zvolen, Žiar n./Hronom, Žilina, Veľký
            Krtíš, Bardejov, Humenné, Košice - vidiek, Michalovce, Poprad,
            Prešov, Rožňava, Spišská Nová Ves, Trebišov, Stará Ľubovňa, Svidník,
            Vranov nad Topľou, Ružomberok, Partizánske.
          </p>
          <h5 className="upperecase">MESTSKÉ VÝBORY, SÍDLO :</h5>
          <p>
            Bratislava - mesto, Košice - mesto (kompetencie ako okresné výbory).
          </p>
          <p>Základné organizácie so sídlom v mestách a obciach SR.</p>
        </div>
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
