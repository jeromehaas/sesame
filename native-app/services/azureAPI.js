import { AZURE_SERVER, AZURE_KEY } from '@env';

const params =
  'detect?returnFaceId=true&recognitionModel=recognition_03&detectionModel=detection_02';

export const detectFace = async (octetStream) => {
  const res = await fetch(`https://${AZURE_SERVER}/face/v1.0/${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
    },
    body: octetStream,
  });
  const faceDetectRes = await res.json();
  return faceDetectRes;
};
