/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/** Section Class */
class Section {

/**Section Id (Also Section Index)*/
lastSectionId = 0;


}//End Class

   /** Navbar Class */
class Navbar {
    /** Menu Elemnt Selected By Id */
menuElement = document.getElementById('navbar__list');

/** Build Menu */
buildMenu() {
    //Clear Menu From "li" Elements
    this.menuElement.innerHTML = '';
    document.querySelectorAll('section').forEach(element => {
         this.menuElement.insertAdjacentHTML('beforeend', `<li><a class="menu__link" href="#${element.id}" data-section-id="${element.id}" >${element.dataset.nav}</a></li>`);
    });
    this.goToSection();
}

    /** Go To Section */
    goToSection() {
        this.menuElement.addEventListener('click', function (event) {
            event.preventDefault();
            document .getElementById(event.target.dataset.sectionId) .scrollIntoView({ behavior: "smooth" });
            addActiveClass(event.target.dataset.sectionId)
        });
    }
    


}//End Class

/**
 * Define Global Variables
 * 
*/
const section = new Section();
const menu = new Navbar();
const goToTopElement = document.getElementById('scrollToTop');
const scrollBtn = document.getElementsByClassName("backToTop")[0];
/**
 * End Global Variables


/** BuildMenu */
{
    menu.buildMenu();
}


/** Go To Top */
const isInViewport = (elem) => {
    const { top, bottom } = elem.getBoundingClientRect();
		const winHeight = window.innerHeight || document.documentElement.clientHeight;

  	return bottom >= 0 && top <= winHeight
};

const showBackToTop = () =>	window.addEventListener("scroll", () => scrollBtn.classList.toggle("backToTop--active", window.scrollY > 500));

const scrollToTop = () => window.scrollTo({ top: 0,	behavior: "smooth" });
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


/** 
 * Function For check What Is Section On Screen Now
 */
function isSectionOnScreen(element, buffer) {
    buffer = typeof buffer === 'underfined' ? 0 : buffer;
// Get element's position in the viewport
const bounding = element.getBoundingClientRect();

    // Check if element is in the viewport
    if (bounding.top >= buffer && bounding.left >= buffer && bounding.right <=
        // fallback for browser compatibility
        ((window.innerWidth || document.documentElement.clientWidth) - buffer) &&
        bounding.bottom <=
        ((window.innerHeight || document.documentElement.clientHeight) - buffer)) {
        return true
    } else {
        return false;
    }
}

/** Add active Class */
function addActiveClass(id){
     //Add Link Active 
     document.querySelector('.link_active')?.classList.remove('link_active');
     document.querySelector(` [href="#${id}"]`).classList.add('link_active');
    
     //Add Section Active
    document.querySelector('.your-active-class')?.classList.remove('your-active-class');
    document.querySelector(`#${id}`).classList.add('your-active-class');

    
}

/**  On User Scrolls */
window. addEventListener('scroll', () => {

    let scrollPrecent = ((window.innerHeight + window.scrollY) / document.body.offsetHeight) * 100;

    //Show or hide 'scroll top button'
    if (scrollPrecent > 40) {
    //show
    goToTopElement.classList.remove('display_none');
} else {
    //Hide
    goToTopElement.classList.add('display__none');
}

    //Update Section Active And Menu Link
    document.querySelectorAll('section').forEach(element => {
        if (isSectionOnScreen(element, -300)) {
            addActiveClass(element.id);
        }
    });

});

// Show backToTopBtn
showBackToTop()

//Call Function To Start
// build the nav

menu.buildMenu();
goToTop();