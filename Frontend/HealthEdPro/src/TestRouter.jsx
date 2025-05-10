import {  Routes, Route } from "react-router-dom";
import { lazy } from "react";
const DepressionTest = lazy(()=> import('./components/Test/Test/DepressionTest.jsx'))
const AnxietyTest = lazy(()=> import('./components/Test/Test/AnxietyTest.jsx'))
const AddictionTest = lazy(()=> import('./components/Test/Test/AddictionTest.jsx'))
const ParentTest = lazy (()=> import('./components/Test/Test/ParentTest.jsx'))
const ADHDTest = lazy (()=> import('./components/Test/Test/AdhdTest.jsx'))
const BIPOLARTest = lazy (()=> import('./components/Test/Test/BipolarTest.jsx'))
const PTSDTest = lazy(()=> import('./components/Test/Test/PtsdTest.jsx'))
const YOUTHTest = lazy (()=> import('./components/Test/Test/YouthTest.jsx'))
const OCDTest = lazy (()=> import('./components/Test/Test/OcdTest.jsx'))
const SLEEPTest = lazy (()=> import('./components/Test/Test/SleepTest.jsx'))
const DEMENTIATest = lazy (()=> import('./components/Test/Test/DementiaTest.jsx'))
const EDPMETest = lazy (()=> import('./components/Test/Test/EdpmeTest.jsx'))



const AppRouter = () => {
  return (
     <Routes>

      <Route path="depression" element={<DepressionTest />} />
      <Route path="anxiety" element={<AnxietyTest />} />
      <Route path="addiction" element={<AddictionTest />} />
      <Route path="parent" element={<ParentTest />} />
      <Route path="adhd" element={<ADHDTest />} />
      <Route path="bipolar" element={<BIPOLARTest />} />
      <Route path="ptsd" element={<PTSDTest />} />
      <Route path="youth" element={<YOUTHTest />} />
      <Route path="ocd" element={<OCDTest />} />
      <Route path="sleep" element={<SLEEPTest />} />
      <Route path="dementia" element={<DEMENTIATest />} />
      <Route path="edpme" element={<EDPMETest />} />
     </Routes>
  );
};

export default AppRouter;
