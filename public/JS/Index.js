// SIDEBAR

var sidebarOpen = false ; 
var sidebar = document.getElementById("sidebar") ; 

function openSidebar() {
    if (!sidebarOpen) {
        sidebar.classList.add("sidebar-responsive"); 
        sidebarOpen = true  ; 
    }
}

function closeSidebar() {
    if (sidebarOpen) {
        sidebar.classList.remove("sidebar-responsive"); 
        sidebarOpen = false  ; 
    }
}

// CHARTS 
(async ()  => {
  const response = await fetch("/graphdata")
  const data = await response.json()
  var barchartoptions = {
    series: [{
    data: [data[0][0]["count(*)"],data[1][0]["count(*)"]]
  }],
    chart: {
    type: 'bar',
    height: 350,
    toolbar: {
        show: false
    },
  },
  colors: [
    "#0A2647", 
    "#0A2647"
  ],
  plotOptions: {
    bar: {
      distributed : true,
      borderRadius: 4,
      horizontal: false,
      columwidth : '40%'
    }
},
dataLabels: {
  enabled: false
},
legend: {
    show: false 
},
xaxis: {
  categories: ['Patients', 'Rendez-vous'],
},
yaxis: {
    title:{
        text:"Nombre"
    }
}
};

var barchart = new ApexCharts(document.querySelector("#bar-chart"), barchartoptions);
barchart.render();
})()




function onDelete(Code) {
  const Sur = window.confirm(
    "Voulez-vous vraiment supperimer l'utilisateur ? "
  );
  if (Sur) {
    fetch(`/${Code}`, {
      method: "delete",
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => console.log(e));
  } else{
    return;
  }
}


function onDelete2(CodeRDV) {
  const Sur = window.confirm(
    "Voulez-vous vraiment supperimer le rendez vous ? "
  );
  if (Sur) {
    fetch(`/ListeRDV/${CodeRDV}`, {
      method: "delete",
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => console.log(e));
  } else{
    return;
  }
}