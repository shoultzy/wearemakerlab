let mainApp;
var scene;

function MainApp() {}

function mainAppInit() {
    mainApp = new MainApp();

    mainApp.homepageContainer = document.getElementById("homepage_container");
    mainApp.homepageBtnTeam = document.getElementById("homepage_btn_team");
    mainApp.homepageBtnAbout = document.getElementById("homepage_btn_about");
    mainApp.homepageSectionUpper = document.getElementById("homepage_section_upper");
    mainApp.homepageSectionLower = document.getElementById("homepage_section_lower");
    mainApp.homepageDivider = document.getElementById("homepage_divider");
    mainApp.homepageSectionReverse = document.getElementById("homepage_section_reverse");
    mainApp.homepageFoldContentUpper = document.getElementById("homepage_fold_content_upper");
    mainApp.homepageReverseOverlay = document.getElementById("homepage_reverse_overlay");

    mainApp.init();
}

MainApp.prototype.init = function (e) {
    this.homepageBtnTeam.addEventListener("click", this.onUserPressTeam.bind(this));
    this.homepageBtnTeam.addEventListener("click", this.onUserPressAbout.bind(this));
};

MainApp.prototype.onUserPressTeam = function (e) {
    TweenMax.to(this.homepageDivider, .25, {ease:Circ.easeInOut, width: "100%", overwrite: false});
    TweenMax.to(this.homepageDivider, .25, {delay: .7, opacity: 0, overwrite: false});

    TweenMax.to(this.homepageSectionUpper, .5, {delay:.3, ease: "Circ.easeIn", rotationX: "90", overwrite: false});
    TweenMax.to(this.homepageFoldContentUpper, .5, {delay:.3, ease: "Circ.easeIn", opacity: 0, overwrite: false});

    TweenMax.to(this.homepageSectionReverse, .5, {delay:.8, ease: "Circ.easeOut", rotationX: "0", overwrite: false});
    TweenMax.to(this.homepageReverseOverlay, .25, {delay:.8, ease: "Circ.easeOut", opacity: 0, overwrite: false});

    requirejs(["../js/scene3d"], function(e) {
        TweenMax.delayedCall(1, scene3DInit);
    });
};

MainApp.prototype.onUserPressAbout = function (e) {

};

mainAppInit();