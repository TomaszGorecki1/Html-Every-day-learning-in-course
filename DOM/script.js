window.onload = function(){
    showsApp.init();
}

let showsApp ={
    data: null,
    searchInput: null,
    showsDataSection: null,
    init: function() {
        //console.log("app started");
        this.searchInput=document.getElementById("search-input");
        this.searchInput.addEventListener("keyup", (e) => {
            if(e.keyCode == 13)
            {
                console.log("enter clicked");
                this.loadData(this.searchInput.value);
            }
        });
        this.showsDataSection = document.querySelector(".shows-data-section");
        this.loadData("breaking bad");
    },
    loadData: function (str) {  
        fetch("https://api.tvmaze.com/singlesearch/shows?q=" + str.trim())
            .then(response => response.json())
            .then(data => this.dataReady(data))
    },
    dataReady: function(showData){
        this.data=showData;
        
      //  console.log(showData);
        

          let allBoxesHtml="";

        for (let i = 0; i < 1; i++) {
            console.log(showData.name);
            let show = showData.name;
            console.log(show);
            let score= showData.score;

            show=showData.name;
            console.log(show);
            //console.log(show);
            //console.log(showData);//

            let genres= showData.genres.join(", ");
            
            let imgSrc=null;
            let imgSrcOriginal=null;
            if(showData.image)
            {
                imgSrc=showData.image.medium;
                imgSrcOriginal=showData.image.original;
            }else
            {
                imgSrc="https://cdn.pixabay.com/photo/2017/08/24/14/52/angel-2677047_960_720.jpg";
                imgSrcOriginal="https://cdn.pixabay.com/photo/2017/08/24/14/52/angel-2677047_960_720.jpg";
            }

            let showTitle = null;

            if(!showData.name)continue;
            showTitle=showData.name;

            let network = "-";
            if (showData.network) {
                network = showData.network.name;
            }

            let officailSite="-";
            if (showData.officialSite)officailSite=showData.officialSite ;

            let premiered="-";
            if (showData.premiered)premiered=showData.premiered ;

            let summary=showData.summary;
            summary=`
            <p>Show: ${showTitle} </p>
            <p>Date: ${premiered} </p>
            <p>Network: ${network} </p>
            <br>
            `+ summary;

            allBoxesHtml += this.getShowBoxByTemplate(imgSrc,showTitle,genres, summary);

        }

        this.showsDataSection.innerHTML = allBoxesHtml;

    },

    getShowBoxByTemplate: function(imgSrc, title, genres, overview){
        return `
            <div class="show-box">

                    <img src="${imgSrc}" alt="">

                <div class="show-title">

                    ${title}

                </div>

                <div class="show-genres">

                    ${genres}

                </div>

                <div class="show-overview">

                    ${overview}

                </div>

            </div>
        `;
    }

};