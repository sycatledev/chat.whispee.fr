import Modal from "./modals/modal";

export default function ProfilModal({
    showProfil,
    setShowProfil
}){
    function handleBack() {
        console.log('close')
        setShowProfil(false)
    }
    return (
        <Modal back={handleBack}>
            
        </Modal>
    )
}