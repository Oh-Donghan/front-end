import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import PointChargeModalStep from './PointChargeModalStep';

import { useState } from 'react';

import StepOneUi from './StepOneUi';
import StepTwoUi from './StepTwoUi';

export default function PointChargeModal({ isOpen, onClose }) {
  const [chargePoint, setChargePoint] = useState(5000);
  const [inputValue, setInputValue] = useState('');
  const [directInputMode, setDirectInputMode] = useState(false);
  const [step, setStep] = useState(1);
  const [inputError, setInputError] = useState(false);
  const [chargeOrderInfo, setChargeOrderInfo] = useState({ orderId: 0, memberId: 0 });

  const handleClose = () => {
    setChargePoint(5000);
    setInputError(false);
    setDirectInputMode(false);
    setStep(1);
    onClose();
  };

  const handleInputChange = e => {
    const value = e.target.value;
    // 숫자 검증: 숫자가 아니면 에러 상태를 true로 설정
    if (/^\d*$/.test(value)) {
      setChargePoint(value);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent minWidth={'446px'} maxWidth={'550px'} paddingX={'10px'} paddingY={'14px'}>
        <ModalHeader display={'flex'} justifyContent={'center'}>
          <PointChargeModalStep step={step} />
        </ModalHeader>
        <ModalBody>
          {step === 1 ? (
            <StepOneUi
              setDirectInputMode={setDirectInputMode}
              setChargePoint={setChargePoint}
              inputError={inputError}
              directInputMode={directInputMode}
              setInputValue={setInputValue}
              handleInputChange={handleInputChange}
              handleClose={handleClose}
              chargePoint={chargePoint}
              setStep={setStep}
              inputValue={inputValue}
              setChargeOrderInfo={setChargeOrderInfo}
            />
          ) : (
            <StepTwoUi
              setDirectInputMode={setDirectInputMode}
              setChargePoint={setChargePoint}
              chargePoint={chargePoint}
              setStep={setStep}
              handleClose={handleClose}
              chargeOrderInfo={chargeOrderInfo}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
