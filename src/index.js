import $ from 'jquery';
//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'perfect-scrollbar/css/perfect-scrollbar.css';
// import PerfectScrollbar from 'perfect-scrollbar';
// import hljs from 'highlight.js/lib/highlight';
// import './css/zenburn-custom.css';
import './css/styles.css';
import App from './reactApp';

window.onload = () => {
  App();
};

//  TODO: Fix this.
const languages = [
  'actionscript',
  'apache',
  'autohotkey',
  'bash',
  'basic',
  'cs',
  'cpp',
  'css',
  'delphi',
  'diff',
  'dockerfile',
  'go',
  'gradle',
  'xml',
  'http',
  'ini',
  'json',
  'java',
  'javascript',
  'kotlin',
  'lua',
  'makefile',
  'markdown',
  'nginx',
  'objectivec',
  'php',
  'perl',
  'python',
  'ruby',
  'rust',
  'sql',
  'swift',
  'brainfuck',
  'coffeescript',
];
/*
languages.forEach((langName) => {
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  hljs.registerLanguage(langName, langModule);
});
*/
$(document).ready(() => {
  $('pre.hljs').each((i, block) => {
    //hljs.highlightBlock(block);
  });

  // line counting
  if ($('.pastaContent').length > 0) {
    const lines = $('.pastaContent')
      .html()
      .split('\n').length;
    for (let i = 1; i <= lines; i += 1) {
      $('td.lines>pre').append(`${i}\n`);
    }
    // PerfectScrollbar('.pastaCard');
  }
});

window.upload = (title, content) => {
  const Pasta = {
    title,
    content,
  };

  if ($('#syntaxSelector').prop('selectedIndex') > 0) Pasta.syntax = $('#syntaxSelector').val();

  if ($('#uploaderName').val().length > 0) Pasta.uploader = $('#uploaderName').val();

  if ($('#label').val().length > 0) Pasta.label = $('#label').val();

  $.ajax({
    method: 'POST',
    url: '/api/uploadPasta',
    processData: false,
    data: JSON.stringify(Pasta),
    contentType: 'application/json',
    success: function(data) {
      $('#submission').fadeOut(300);
      $('.alert').fadeOut(300);
      $('#sendSucceeded .alert-link').attr('href', '/' + data);
      $('#sendSucceeded #copyLink').val(window.location.href + data);
      $('#sendSucceeded').fadeIn(300);
    },
  });
};

window.uploadPasta = () => {
  const pastaName = $('#pastaName').val();
  if ($('#thePasta').val().length < 15) {
    $('.alert').fadeOut(300);
    $('#sendError')
      .fadeIn(300)
      .html('No blank submissions please.');
  } else {
    window.upload(pastaName, $('#thePasta').val());
  }
};

window.zoom = (type) => {
  const fontSize = parseInt($('.pastaTable').css('font-size'), 10);
  if (type === 'in' && fontSize < 22) {
    $('.pastaTable').css('font-size', fontSize + 2);
  } else if (type === 'out' && fontSize > 12) {
    $('.pastaTable').css('font-size', fontSize - 2);
  }
};
