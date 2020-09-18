console.log("I WORK!")

let sheetUrl = "https://docs.google.com/spreadsheets/d/13rqpSpUOVXWOqG0Hei9EzC3hW4pAAuvvLAukurssNak/edit?usp=sharing"

let sheetID = "13rqpSpUOVXWOqG0Hei9EzC3hW4pAAuvvLAukurssNak"
let sheetAsJSON = `https://spreadsheets.google.com/feeds/list/13rqpSpUOVXWOqG0Hei9EzC3hW4pAAuvvLAukurssNak/od6/public/values?alt=json`

let projectsArray;
// const render = (projectsArr) => {
//     console.log('this is projectArr', projectsArr)
// }


function gettingData() {
    $.ajax({url:sheetAsJSON})
        .then( data => {
            console.log(data)
            //return a new array of data... best way to do that is what? .map()
            //      plural                        singular
            const projects = data.feed.entry.map( project => {
                return {
                    title: project.gsx$title.$t,
                    image: project.gsx$image.$t,
                    description: project.gsx$description.$t,
                    link: project.gsx$link.$t
                }
            })
            console.log(projects)
            
            projects.forEach(project => {
                $('.carousel-inner').append(
                    `
                    <div class="carousel-item">
                        <img src=${project.image} class="d-block w-100" alt="Responsive image">
                        <div class="carousel-caption d-none d-md-block">
                            <h5><mark>${project.title}</mark></h5>
                            <p><mark>${project.description}</mark</p><br>
                            <a href="${project.link}">click me</a>
                        </div>
                    </div>
                    `
                )
            });
        })
}
gettingData()