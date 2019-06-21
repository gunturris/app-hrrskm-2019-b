
var serverHost = 'http://103.31.109.106:2224/app-rest/';
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function get_emp_book_open(){
    location.href = "../empbook/index.html?kid=" +  getParameterByName('kid') 
}

routes = [
  {
    path: '/',
    url: 'index.html',
      
  },
  {
    path: '/home/',
    url: './pages/home.html',
    
      
  },
  {
    path: '/faq/',
    url: './pages/view_faq.html',
  },
  {
    path: '/contact-us/',
    url: './pages/form_kontak.html',
  },
  {
    path: '/complain/',
    url: './pages/form_komplain.html',
  },
  {
    path: '/medical/',
    url: './pages/medical.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/gantipin/',
    url: './pages/gantipin.html',
  },
  {
    path: '/cuti-riwayat/',
    url: './pages/report_riwayat_cuti.html',
  },
  {
    path: '/form-cuti/',
    url: './pages/form_cuti.html', 
  },
  {
    path: '/form-batal-cuti/',
    url: './pages/form_cuti_batal.html', 
  },
  {
    path: '/form-spd/',
    url: './pages/form_jalan_dinas.html', 
  },
  {
    path: '/achieve/',
    url: './pages/achieve.html', 
  },
  {
    path: '/profil-user/',
    url: './pages/profile-user.html', 
  },
  {
    path: '/request/',
    url: './pages/request.html', 
  },
  {
    path: '/capture/',
    url: './pages/form_shot_capture.html', 
  },
  {
    path: '/form-ijin/',
    url: './pages/form_ijin.html',
    async: function(routeTo, routeFrom, resolve, reject){
        
    }
  },
  {
    path: '/form-tukar-dinas/',
    url: './pages/form_tukar_dinas.html',
    async: function(routeTo, routeFrom, resolve, reject){
        
    }
  },
  {
    path: '/form-lembur/',
    url: './pages/form_lembur.html',
    async: function(routeTo, routeFrom, resolve, reject){
        
    }
  },
  {
    path: '/logoff/',
    url: '/login.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/setelan/',
    url: './pages/setelan.html',
  },
  {
    path: '/help/',
    url: './pages/help.html',
  }, 
  {
    path: '/product/:id/',
    componentUrl: './pages/product.html',
  },
  {
    path: '/settings/',
    url: './pages/settings.html',
  },
  {
    path: '/checkinmcu/',
    url: './pages/form_shot_capture.html',
  },
  {
    path: '/kuponmcu/',
    url: './pages/view_kupon_mcu.html',
  },
  {
    path: '/periodegaji/',
    url: './pages/report_periode_gaji.html',
  },
  {
    path: '/profile/',
    url: serverHost +"data_profile.php?kid=" + getParameterByName('kid') ,
  },
  {
    path: '/employee/',
    url:  "../empbook.html?kid=" + getParameterByName('kid') ,
  },
  {
    path: '/profile_riwayat_kerja_edit/:eID',
    async: function (routeTo, routeFrom, resolve, reject) {
        var eID = routeTo.params.eID; 
        resolve(
          {
            url: './pages/form_profile_riwayat_karja.html?kid=' + getParameterByName('kid') +"&id="+eID,
          } 
        );
    } 
  },
  {
    path: '/profile_riwayat_kesehatan_edit/:eID',
    async: function (routeTo, routeFrom, resolve, reject) {
        var eID = routeTo.params.eID; 
        resolve(
          {
            url: './pages/form_profile_riwayat_kesehatan.html?kid=' + getParameterByName('kid') +"&id="+eID,
          } 
        );
    } 
  },
  {
    path: '/profile_riwayat_pendidikan_edit/:eID',
    async: function (routeTo, routeFrom, resolve, reject) {
        var eID = routeTo.params.eID; 
        resolve(
          {
            url: './pages/form_profile_riwayat_pendidikan.html?kid=' + getParameterByName('kid') +"&id="+eID,
          } 
        );
    } 
  },
  {
    path: '/profile_keluarga_edit/:eID',
    async: function (routeTo, routeFrom, resolve, reject) {
        var eID = routeTo.params.eID; 
        resolve(
          {
            url: './pages/form_profile_keluarga.html?kid=' + getParameterByName('kid') +"&id="+eID,
          } 
        );
    } 
  },
  {
    path: '/profileedit/',
    url: serverHost +"data_profile_edit.php?kid=" + getParameterByName('kid') ,
  },
  {
    path: '/keluarga/:cID',
    async: function (routeTo, routeFrom, resolve, reject) {
        var cid = routeTo.params.cID; 
        resolve(
          {
            url: serverHost + 'data_keluarga.php?kid=' + getParameterByName('kid') +"&cid="+cid,
          } 
        );
    }
  },
  {
    path: '/riwayatsehat/',
    url: serverHost + 'data_kesehatan.php?kid=' + getParameterByName('kid') ,
  },
  {
    path: '/riwayatdidik/',
    url: serverHost + 'data_pendidikan.php?kid=' + getParameterByName('kid') ,
  },
  {
    path: '/riwayatkerja/',
    url: serverHost + 'data_riwayat_kerja.php?kid=' + getParameterByName('kid') ,
  },
  {
    path: '/gaji/:pID',
    async: function (routeTo, routeFrom, resolve, reject) {
        var pid = routeTo.params.pID; 
        
        if(pid.length < 3){
            pid = '0' + pid; 
            console.log(serverHost +"gaji.php?kid=" + getParameterByName('kid') +"&pid=" + pid);
        } 
        resolve(
          {
            
            url: serverHost +"gaji.php?kid=" + getParameterByName('kid') +"&pid=" + pid,
          } 
        );
    }
    
  },
  {
    path: '/achieve/:kls',
    async: function (routeTo, routeFrom, resolve, reject) {
        var kls = routeTo.params.kls;  
        var kid =  getParameterByName('kid');  
        resolve(
          {
            kls : kls ,
            url:  "./pages/report_achieve.html?kls=" + kls +"&kid=" + kid,
          } 
        );
    } 
  },
  {
    path: '/pinjaman/',
    url: './pages/report_daftar_pinjaman.html', 
  },
  {
    path: '/pinjamandetail/:potID',
    async: function (routeTo, routeFrom, resolve, reject) {
         
        var potID = routeTo.params.potID; 
        
        resolve(
          {
              
             url: './pages/report_daftar_pinjaman_detail.html?potid='+potID,
             id: potID
          } 
        );
    },
    
    
  },
  {
    path: '/gaji-non/',
    url: serverHost + 'gaji-non.php?kid=' + getParameterByName('kid') , 
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
