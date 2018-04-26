import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ViewPastaApp from './ViewPastaApp';
import UploadApp from './uploadApp';

window.onload = () => {
  const pastaRoot = document.querySelector('#pastaRoot') || false;
  const uploadRoot = document.querySelector('#submission') || false;
  if (pastaRoot) {
    ViewPastaApp(pastaRoot);
  }
  if (uploadRoot) {
    UploadApp(uploadRoot);
  }
};
