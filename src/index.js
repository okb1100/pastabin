import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ViewPastaApp from './ViewPastaApp';
import UploadApp from './uploadApp';
import ListApp from './listApp';

window.onload = () => {
  const pastaRoot = document.querySelector('#pastaRoot') || false;
  const uploadRoot = document.querySelector('#submission') || false;
  const listRoot = document.querySelector('#listRoot') || false;
  let listType;
  if (pastaRoot) {
    ViewPastaApp(pastaRoot);
  }
  if (uploadRoot) {
    UploadApp(uploadRoot);
  }
  // eslint-disable-next-line
  if ((listType = window.location.pathname.match(/\/(.+)\//)[1])) {
    if (listRoot) {
      ListApp(listRoot, listType);
    }
  }
};
