import Modal from "./modals/modal";

export default function ProfilModal({ showProfil, setShowProfil }) {
  function handleBack() {
    setShowProfil(false);
  }
  return <Modal back={handleBack}></Modal>;
}
