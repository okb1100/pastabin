import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import "./css/zenburn-custom.css";
import "./css/perfect-scrollbar.css";
import PerfectScrollbar from "./perfect-scrollbar.min.js";
import hljs from "highlight.js/lib/highlight";
//TODO: Fix this.
var languages = [
  "actionscript",
  "apache",
  "autohotkey",
  "bash",
  "basic",
  "cs",
  "cpp",
  "css",
  "delphi",
  "diff",
  "dockerfile",
  "go",
  "gradle",
  "xml",
  "http",
  "ini",
  "json",
  "java",
  "javascript",
  "kotlin",
  "lua",
  "makefile",
  "markdown",
  "nginx",
  "objectivec",
  "php",
  "perl",
  "python",
  "ruby",
  "rust",
  "sql",
  "swift",
  "brainfuck",
  "coffeescript"
];

languages.forEach(langName => {
  var langModule = require(`highlight.js/lib/languages/${langName}`);
  hljs.registerLanguage(langName, langModule);
});

$(document).ready(() => {
  $("pre.hljs").each(function(i, block) {
    hljs.highlightBlock(block);
  });

  // date formatting
  var dateElem = $(".date");
  if (dateElem.length > 0) {
    var date = new Date(parseInt(dateElem.html()));
    dateElem.html(date.toLocaleString());
  }

  // line counting
  if ($(".pastaContent").length > 0) {
    var lines = $(".pastaContent")
      .html()
      .split("\n").length;
    for (var i = 1; i <= lines; i++) {
      $("td.lines>pre").append(i + "\n");
    }
    const ps = new PerfectScrollbar(".pastaCard");
  }
});

window.upload = (title, content) => {
  var Pasta = {
    title: title,
    content: content
  };

  if ($("#syntaxSelector").prop("selectedIndex") > 0)
    Pasta.syntax = $("#syntaxSelector").val();

  if ($("#uploaderName").val().length > 0)
    Pasta.uploader = $("#uploaderName").val();

  if ($("#label").val().length > 0) Pasta.label = $("#label").val();

  $.ajax({
    method: "POST",
    url: "/api/uploadPasta",
    processData: false,
    data: JSON.stringify(Pasta),
    contentType: "application/json",
    success: function(data) {
      $("#submission").fadeOut(300);
      $(".alert").fadeOut(300);
      $("#sendSucceeded .alert-link").attr("href", "/" + data);
      $("#sendSucceeded #copyLink").val(window.location.href + data);
      $("#sendSucceeded").fadeIn(300);
    },
    always: function() {
      console.log("sent");
    }
  });
};

window.uploadPasta = () => {
  var toUpload = null;
  var pastaName = $("#pastaName").val();
  if (
    // $('#filePasta')[0].files.length == 0 &&   // file upload check, activate it later..
    $("#thePasta").val().length < 15
  ) {
    $(".alert").fadeOut(300);
    $("#sendError")
      .fadeIn(300)
      .html("No blank submissions please.");
  } else {
    /*  if ($('#filePasta')[0].files.length > 0) {
            //file upload
        } else {
            upload(pastaName, $('#thePasta').val());
        }*/
    upload(pastaName, $("#thePasta").val());
  }
};

window.copyToClipboard = elementToCopy => {
  elementToCopy = $(elementToCopy);
  if (elementToCopy.prop("tagName") != "INPUT") {
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val(elementToCopy.prop("innerText")).select();
    document.execCommand("copy");
    $temp.remove();
  } else {
    elementToCopy.select();
    document.execCommand("copy");
  }
  alert("Copied to clipboard!");
};

window.zoom = type => {
  var fontSize = parseInt($(".pastaTable").css("font-size"));
  if (type == "in" && fontSize < 22) {
    $(".pastaTable").css("font-size", fontSize + 2);
  } else if (type == "out" && fontSize > 12) {
    $(".pastaTable").css("font-size", fontSize - 2);
  }
};