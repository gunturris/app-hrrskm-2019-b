 
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function get_book_close(){
    location.href =  "../appview/index.html?kid=" + getParameterByName('kid')
}

routes = [
  {
    path: '/',
    url: 'index.html',
      
  },
  {
    path: '/di/',
    url: './pages/bab__.html',
      
  },
  {
    path: '/mu/',
    url: './pages/bab_0.html',
      
  },
  {
    path: '/a/',
    url: './pages/bab_1.html',
      
  },
  {
    path: '/b/',
    url: './pages/bab_2.html',
      
  },
  {
    path: '/c/',
    url: './pages/bab_3.html',
      
  },
  {
    path: '/d/',
    url: './pages/bab_4.html',
      
  },
  {
    path: '/e/',
    url: './pages/bab_5.html',
      
  },
  {
    path: '/f/',
    url: './pages/bab_6.html',
      
  },
  {
    path: '/g/',
    url: './pages/bab_7.html',
      
  },
  {
    path: '/h/',
    url: './pages/bab_8.html',
      
  },
  {
    path: '/i/',
    url: './pages/bab_9.html',
      
  },
  {
    path: '/j/',
    url: './pages/bab_10.html',
      
  },
  {
    path: '/k/',
    url: './pages/bab_11.html',
      
  },
  {
    path: '/l/',
    url: './pages/bab_12.html',
      
  },
  {
    path: '/m/',
    url: './pages/bab_13.html',
      
  },
  {
    path: '/n/',
    url: './pages/bab_14.html',
      
  },
  {
    path: '/close/',
    url:  "/appview/index.html?kid=" + getParameterByName('kid') ,
  },
];
