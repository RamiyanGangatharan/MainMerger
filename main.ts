/**
 * @author: Ramiyan Gangatharan
 * Student ID: 100835223
 * @date: January 27, 2024
 */

/**
 * Main application script containing multiple functionalities like initializing carousels,
 * loading dynamic content, handling modals, validating forms, and more.
 * @author: Various contributors including Ramiyan Gangatharan and Joy Tejada.
 * Dates of contribution are marked at relevant sections.
 */

"use strict";

import {Calendar, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import Chart from "chart.js";

// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace.
(function (): void {
    // Function to initialize the application
    function Start(): void {
        console.log("App Started!"); // Logs to console when the app starts
        loadHeader(); // Loads the header content dynamically
        loadContent(); // Loads the contents dynamically
        loadFooter(); // Loads the footer content dynamically
        initializeCarousel(); // Initializes the image carousel
        fetchFactOfTheDay(); // Fetches a fact of the day from an external API

        // Switch case to execute page-specific code based on the document's title
        /*switch (document.title) {
            case "Team":
                displayModal(); // Displays modal for team page
                break;
            case "Register":
                displayRegisterPage(); // Handles register page display logic
                break;
            case "Login":
                displayLoginPage(); // Handles login page display logic
                break;
            case "Statistics":
                getStatistics();
                break;
        }*/
    }


// Event listener for the window's load event to ensure Start function is called when the DOM is fully loaded
    window.addEventListener("load", Start);

    // Initializes the carousel functionality on the page
    function initializeCarousel(): void {
        let index: number = 0; // Current slide index
        const slides: NodeListOf<HTMLElement> = document.querySelectorAll(".carousel-images img") as NodeListOf<HTMLElement>;
        const descriptions: NodeListOf<HTMLElement> = document.querySelectorAll(".carousel-descriptions .description") as NodeListOf<HTMLElement>;

        if (slides.length === 0 || descriptions.length === 0) {
            console.error("Carousel slides or descriptions not found.");
            return;
        }

        function showSlide(n: number): void {
            // Adjust index within the bounds
            if (n >= slides.length) {
                index = 0;
            } else if (n < 0) {
                index = slides.length - 1;
            } else {
                index = n;
            }

            // Hide all slides and descriptions
            slides.forEach((slide) => {
                slide.style.display = "none";
            });
            descriptions.forEach((description) => {
                description.style.display = "none";
            });

            // Show the current slide and its description
            slides[index].style.display = "block";
            descriptions[index].style.display = "block";
        }

        // Advances the carousel to the next slide
        function nextSlide(): void {
            showSlide(index + 1);
        }

        // Initialize the first slide
        showSlide(index);

        // Change slides every 5 seconds
        setInterval(() => {
            nextSlide();
        }, 5000);
    }

    document.addEventListener('DOMContentLoaded', initializeCarousel);

// PORTFOLIO
    /**
     * Event listener for DOMContentLoaded event to ensure that the DOM is fully loaded before initializing project-related functionalities.
     */
    document.addEventListener('DOMContentLoaded', function():void {
        const projectsContainer: HTMLElement = document.getElementById('projects-container')!;
        const loadMoreButton: HTMLElement | null = document.getElementById('loadMore')!;


        let projects: { imageUrl: string; description: string; title: string }[];

        projects = [{
            title: 'Project One',
            description: 'A brief description of Project One.',
            imageUrl: "../../Images/NY-SKYLINE.webp"
        },
            {
                title: 'Project Two',
                description: 'A brief description of Project Two.',
                imageUrl: "../../Images/YYZ-SKYLINE.webp"
            },
            {
                title: 'Project Three',
                description: 'A brief description of Project Three.',
                imageUrl: "../../Images/england_skyline.jpg"
            },
            {
                title: 'Project Four',
                description: 'A brief description of Project Four.',
                imageUrl: "../../Images/PWC_OFFICE.webp"
            },
            {
                title: 'Project Five',
                description: 'A brief description of Project Five.',
                imageUrl: "../../Images/cup-team-photo-2023-2.png"
            },
            {
                title: 'Project Six',
                description: 'A brief description of Project Six.',
                imageUrl: "../../Images/CVPRW2023_EventVision_group_picture.jpg"
            }
        ];

        /**
         * Creates an HTML card element containing project details.
         * @param {Object} project - The project data.
         * @param {string} project.title - The title of the project.
         * @param {string} project.description - A brief description of the project.
         * @param {string} project.imageUrl - The URL of the project's image.
         * @returns {HTMLElement} The project card element.
         */
        function createProjectCard(project: { title: string; description: string; imageUrl: string; }): HTMLElement {
            let card: HTMLDivElement = document.createElement('div');
            card.className = 'col-lg-4 col-md-6 mb-4';
            card.innerHTML = `
            <div class="card h-100">
                <img style="margin-top: 15px; height: 250px" 
                    src="${project.imageUrl}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                </div>
            </div>
        `;
            return card;
        }

        /**
         * Loads a specified number of projects from the projects array and appends them to the projects' container.
         * If there are no more projects to load, disables the 'Load More' button.
         * @param {number} [numProjects=3] - The number of projects to load each time the function is called.
         */
        function loadProjects(numProjects: number = 3): void {
            let projectsToLoad: { imageUrl: string; description: string; title: string }[] = projects.splice(0, numProjects);
            projectsToLoad.forEach((project: { imageUrl: string; description: string; title: string }):void => {
                projectsContainer.appendChild(createProjectCard(project));
            });
            if (projects.length === 0) {
                if (loadMoreButton instanceof HTMLButtonElement) {
                    loadMoreButton.disabled = true;
                }
            }
        }


        // Initial load of projects
        loadProjects();

        // Event listener for 'Load More' button
        loadMoreButton.addEventListener('click', function() {
            loadProjects();
        });
    });

    window.addEventListener("load", Start);


    /**
     * @author: Joy Tejada
     * Student ID: 100883359
     * @date: 2024-01-27
     */

// Teams Page: Modal
// Get the modal
    function displayModal():void {
        const openRamiyan: HTMLElement | null = document.getElementById("open-ramiyan");
        const openJoy: HTMLElement | null = document.getElementById("open-joy");
        const modalRamiyan: HTMLElement | null = document.getElementById('ramiyan-modal');
        const modalJoy: HTMLElement | null = document.getElementById("joy-modal");
        const closeRamiyan: HTMLElement | null = document.getElementById("closeRamiyan");
        const closeJoy: HTMLElement | null = document.getElementById("closeJoy");

        if (openRamiyan instanceof HTMLElement) {
            openRamiyan.addEventListener("click", ():void => {
                modalRamiyan?.classList.add("show");
            });
        }

        if (openJoy instanceof HTMLElement) {
            openJoy.addEventListener("click", ():void => {
                modalJoy?.classList.add("show");
            });
        }

        if (closeRamiyan instanceof HTMLElement) {
            closeRamiyan.addEventListener("click", ():void => {
                modalRamiyan?.classList.remove("show");
            });
        }

        if (closeJoy instanceof HTMLElement) {
            closeJoy.addEventListener("click", ():void => {
                modalJoy?.classList.remove("show");
            });
        }
    }


    /**
     * Created by Ramiyan Gangatharan
     * @param method
     * @param url
     * @param callback
     * @constructor
     */
    function AJAX_REQUEST(method: string, url: string | URL, callback: { (responseText: any): void; (arg0: string): void; }):void
    {
        // Step 1:instantiate new XHR object
        let xhr:XMLHttpRequest = new XMLHttpRequest();
        // Step 2: open XHR request
        xhr.open(method, url);

        // Step 4: Add event listener for the readystatechange event
        // This event is triggered when the state of a document being fetched changes
        xhr.addEventListener("readystatechange", ():void =>
        {
            if(xhr.readyState === 4 && xhr.status === 200)
            {
                if(typeof callback == "function")
                {
                    callback(xhr.responseText);
                }
                else
                {
                    console.error("ERROR: CALLBACK NOT A FUNCTION");
                }
            }
        });

        // Step 3: send XHR request
        xhr.send();
    }

    function ActiveLinkCallBack(){
        switch(router.ActiveLink){
            case "home": return;
            case "blog": return;
            case "contact": return;
            case "event-planning": return;
            case "fact": return;
            case "gallery": return;
            case "login": return displayLoginPage();
            case "logout": return;
            case "portfolio": return;
            case "privacy": return;
            case "register": return displayRegisterPage();
            case "services": return;
            case "statistics": return getStatistics();
            case "team": return displayModal;
            case "TOS": return;
            case "404": return;
            default:
                console.error("ERROR: callback function does not exist " + router.ActiveLink);
                return new Function();
        }
    }

    // Function to load the header dynamically
    function loadHeader() {
        let pathToHeader: string;

        // Determine the path based on the current location
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            pathToHeader = 'views/components/header.html';
        } else {
            pathToHeader = '../views/components/header.html';
        }

        fetch(pathToHeader)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const headerElement = document.getElementById('site-header');
                if (headerElement) {
                    headerElement.innerHTML = html;
                } else {
                    console.warn('The header element was not found in the document.');
                }
            })
            .catch(error => {
                console.error('Failed to load header: ', error);
            });
    }

    function loadContent():void{
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallBack();

        $.get(`./views/content/${page_name}.html`, function(html_data){
            $("main").html(html_data);
            CheckLogin();
            callback();
        )};
    }

    // Function to load the footer dynamically
    function loadFooter():void {
        fetch('/views/components/footer.html') // Use root-relative path
            .then(response => response.text())
            .then(html => {
                let footerElement: HTMLElement | null;
                footerElement = document.getElementById('site-footer');
                if (footerElement !== null) {
                    footerElement.innerHTML = html;
                } else {
                    console.warn('The footer element was not found in the document.');
                }
            })
            .catch(error => {
                console.warn('Error loading the footer:', error);
            });
    }


    document.addEventListener('DOMContentLoaded', function():void {
        loadHeader();
        loadFooter();
    });

// EVENTS

    document.addEventListener('DOMContentLoaded', function():void {
        // Define the callback function to process the response
        /**
         * This function grabs content from the JSON file
         * @param responseText
         */
        function processEventsData(responseText: string):void {
            const data = JSON.parse(responseText);
            const events = data.event;
            const eventsContainer: HTMLElement | null = document.getElementById('events-container');

            // Clear out any existing content in the events container
            if (eventsContainer) {
                eventsContainer.innerHTML = '';

                events.forEach((event: { imageUrl: string; title: string; description: string; }): void => {
                    let eventElement = document.createElement('div');
                    eventElement.className = 'col-md-4 mb-4';
                    eventElement.innerHTML = `
            <div class="card">
                <img src="${event.imageUrl}" class="card-img-top" alt="${event.title}">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.description}</p>
                </div>
            </div>`;
                    eventsContainer.appendChild(eventElement);
                });
            } else {
                console.warn('The events container element was not found in the document.');
            }
        }

        // Use the AJAX_REQUEST function to fetch the events.json file
        AJAX_REQUEST('GET', '../../data/events.json', processEventsData);
    });

    interface FactApiResponse {
        fact: string;
    }

    function fetchFactOfTheDay(): void {
        const limit:1 = 1;
        const apiKey: string = 'NhKexKzfF0TmdyXL/Jj/0Q==MMvyNrvqLLVQWkS2'; // Reminder: It's best practice to keep API keys hidden, not in front-end code

        $.ajax({
            method: 'GET',
            url: `https://api.api-ninjas.com/v1/facts?limit=${limit}`,
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json',
            success: function(result: any[]): void { // Temporarily accept any[] until we verify the structure
                console.log(result);

                // Use a type assertion to tell TypeScript what structure we're expecting
                const facts: FactApiResponse[] = result as FactApiResponse[];

                if (facts.length > 0) {
                    $('#fact-of-the-day').text(facts[0].fact);
                } else {
                    console.error('Unexpected result structure:', result);
                }
            },
            error: function(jqXHR: { responseText: any; }): void {
                console.error('Error fetching fact of the day:', jqXHR.responseText || 'Unknown error');
            }
        });
    }
    /**
     * Checks if a user is logged in
     * @constructor
     */
    function CheckLogin(): void {
        if(localStorage.length > 0){
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                <i class="fas fa-sign-out-alt"></i> Logout</a>`);

            let keys = Object.keys(localStorage);

            // Writes the users name if they are logged in on the homepage
            for(const key of keys){
                if(key === "users"){
                    let userData = localStorage.getItem(key);
                    // Check if userData is not null before proceeding
                    if (userData !== null) {
                        let usersName = userData.split(",");
                        $("#name").html(`<h1 id="name">Welcome ${usersName[0]} to The Harmony Hub</h1>`);
                        $("#")
                    }
                }
            }
        }else{
            location.href = "login.html";
        }

        $("#logout").on("click", function ():void{
            // Perform Logout
            localStorage.clear();

            // Redirect to login.html page
            location.href = "login.html";
        });
    }


    /**
     * Regular expressions to help validate the register form
     */
    function RegisterFormValidation():void{
        // Call for First Name
        ValidateField("#firstName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid First Name.");

        // Call for Last Name
        ValidateField("#lastName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid Last Name.");

        // Call for Address
        // Taken from https://regex101.com/library/CtqxiP?filterFlavors=javascript&orderBy=MOST_RECENT&search=
        ValidateField("#address",
            /^(?![ -.&,_'":?!/])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!/]{2})[a-zA-Z0-9- .#@&,_'":?!/]+$/,
            "Please enter a valid Address.")

        // Call for Phone Number
        ValidateField("#phoneNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid Contact Number.");

        // Call for Email Address
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid Email Address!");


    }

    /**
     * Validate Form Fields provided by users
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    const ValidateField = (input_field_id: string, regular_expression: RegExp, error_message: string): void => {
        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function(event) {
            // Use $(event.target) instead of $(this) for better type inference
            let inputField = $(event.target);
            let inputFieldText = inputField.val();
            if (!regular_expression.test(<string>inputFieldText)) {
                inputField.trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            } else {
                // Full name was successful
                messageArea.removeAttr("class").hide();
            }
        });
    };

    /**
     * The Register Page
     * When the form is submitted after validation, will check if username already exists,
     * and if the passwords are the same.
     */
    function displayRegisterPage():void{
        console.log("Called RegisterPage");

        RegisterFormValidation();

        $("#sendButton").on("click", function (): void {
            // Typecast each element to HTMLInputElement to access the value property
            let firstName = document.getElementById("firstName") as HTMLInputElement;
            let lastName = document.getElementById("lastName") as HTMLInputElement;
            let address = document.getElementById("address") as HTMLInputElement;
            let phoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
            let emailAddress = document.getElementById("emailAddress") as HTMLInputElement;
            let username = document.getElementById("username") as HTMLInputElement;
            let password = document.getElementById("password") as HTMLInputElement;
            let confirmPassword = document.getElementById("confirmPassword") as HTMLInputElement;

            let success:boolean = true;
            // Assuming newUser and core.User exist and are correctly implemented
            let newUser = new core.User();
            let messageArea = $("#messageArea").hide();

            $.get("../../data/users.json", function(data: { users: any; }): void {
                for(const user of data.users){
                    if(username.value === user.Username){
                        success = false;
                        break;
                    }
                }
                if(success && password.value === confirmPassword.value){
                    // Assuming toJSON is correctly implemented and can handle HTMLInputElement types
                    //newUser.toJSON(firstName.value, lastName.value, address.value, phoneNumber.value, emailAddress.value, username.value, password.value); //causes error in typescript

                    // Assuming serialize is correctly implemented
                    sessionStorage.setItem("users", newUser.serialize() as string);
                    messageArea.removeClass("alert alert-danger").hide();

                    location.href = "../../index.html";
                }else{
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("ERROR: Username Taken or Passwords do not match.").show();
                }
            });
        });
    }

    /**
     * Displays the login page
     * Authentication if the users Login Credentials are accurate to the data stored
     * Shows error messages if there is an error
     */
    function displayLoginPage(){
        console.log("Called Displayed Login Page.");

        let messageArea = $("#messageArea").hide();

        $("#submitButton").on("click", function() {
            // Correctly cast elements to HTMLInputElement
            let username = document.getElementById("username") as HTMLInputElement;
            let password = document.getElementById("password") as HTMLInputElement;

            let success = false;
            let newUser = new core.User();

            $.get("../../data/users.json", function(data: { users: any; }) {
                // Check if the fetched users array is not empty and elements are not null
                if (username && password) {
                    for(const user of data.users) {
                        // Now safely use the value property
                        if(username.value === user.Username && password.value === user.Password) {
                            newUser.fromJSON(user); // Assuming fromJSON is a method of newUser
                            success = true;
                            break;
                        }
                    }
                    if(success) {
                        // Assuming serialize is a method of newUser
                        localStorage.setItem("users", newUser.serialize() as string);
                        messageArea.removeAttr("class").hide();
                        location.href = "../../index.html";
                    } else {
                        $("#username").trigger("focus").trigger("select");
                        messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
                    }
                }
            });
        });

        $("#cancelButton").on("click", function(): void {
            location.href = "../../index.html";
        });
    }

// Gallery Model
    function openModal(): void {
        const modal = document.getElementById("myModal");
        if (modal) { // Check if the modal is not null
            modal.style.display = "block";
        } else {
            console.warn("Modal element not found");
        }
    }

    function closeModal(): void {
        const modal = document.getElementById("myModal");
        if (modal) { // Check if the modal is not null
            modal.style.display = "none";
        } else {
            console.warn("Modal element not found");
        }
    }
    let slideIndex:number = 1;
    showSlides(slideIndex);

// Next/previous controls
    function plusSlides(n: number):void {
        showSlides(slideIndex += n);
    }

// Thumbnail image controls
    function currentSlide(n: number):void {
        showSlides(slideIndex = n);
    }

    function showSlides(n: number): void {
        let slides: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>; // Cast to specific element type
        let dots: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("demo") as HTMLCollectionOf<HTMLElement>; // Assuming dots can be treated as HTMLElements
        let captionText: HTMLElement | null = document.getElementById("caption");

        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Ensure slideIndex is within bounds to avoid accessing undefined elements
        if (slideIndex - 1 < slides.length && slideIndex - 1 < dots.length) {
            slides[slideIndex - 1].style.display = "block"; // Safe to access `style`
            dots[slideIndex - 1].className += " active";
            // Check if captionText is not null and dots are HTMLElements (for 'alt')
            if (captionText !== null && dots[slideIndex - 1] instanceof HTMLElement) {
                captionText.innerHTML = dots[slideIndex - 1].getAttribute('alt') || ""; // Use getAttribute for 'alt'
            }
        }
    }


// getting feedback asynchronously with Ajax
    function AjaxFeedback(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        let feedback: HTMLInputElement | HTMLTextAreaElement | null = document.getElementById("feedback") as HTMLInputElement | HTMLTextAreaElement | null;

        if (feedback) {
            sessionStorage.setItem("feedback", feedback.value);
        }

        xhr.open("GET", "../../views/content/contact.html", true);
        xhr.onload = (): void => {
            if (xhr.status === 200) {
                location.href = "../../index.html";
            } else {
                // Handle error - maybe notify the user
            }
        };
        xhr.onerror = (): void => {
            // Handle network error
        };
        xhr.send();
    }

    interface EventDetails {
        name: string;
        description: string;
        date: string;
    }

    function addEventToCalendar(event: EventDetails): void {
        const eventList: HTMLElement = document.getElementById('eventList')!;
        const eventItem: HTMLLIElement = document.createElement('li');
        eventItem.classList.add('list-group-item');
        eventItem.textContent = `${event.name} - ${event.date}: ${event.description}`;
        eventList.appendChild(eventItem);
    }


    document.getElementById('eventForm')!.addEventListener('submit', function(e) {
        e.preventDefault();

        const eventName = document.getElementById('eventName') as HTMLInputElement;
        const eventDescription = document.getElementById('eventDescription') as HTMLTextAreaElement;
        const eventDate = document.getElementById('eventDate') as HTMLInputElement;

        const event: EventDetails = {
            name: eventName.value,
            description: eventDescription.value,
            date: eventDate.value
        };

        console.log("Adding event:", event);
        addEventToCalendar(event);

        eventName.value = '';
        eventDescription.value = '';
        eventDate.value = '';
    });

    document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar');

        if (calendarEl) {
            const calendar = new Calendar(calendarEl, {
                plugins: [dayGridPlugin], // Add the dayGrid plugin
                initialView: 'dayGridMonth', // Display month view by default
                events: fetchEventData // Pass a function reference to fetch event data
            });

            calendar.render(); // Render the calendar
        }
    });

// Define the type for event data
    interface EventData {
        title: string;
        start: string;
        // Add more properties as needed
    }

// Function to fetch event data
    function fetchEventData(fetchInfo: any, successCallback: (eventInputs: EventInput[]) => void, failureCallback: any) {
        // Simulated data for demonstration
        const eventData: EventData[] = [
            {
                title: 'Event 1',
                start: '2024-04-01'
            },
            {
                title: 'Event 2',
                start: '2024-04-05'
            }
            // Add more events as needed
        ];
        successCallback(eventData);
    }

    $(function():void {
        $('#eventForm').on('submit', function(e: JQuery.SubmitEvent<HTMLElement, undefined, HTMLElement, HTMLElement>):void {
            e.preventDefault();
            const eventName: string | number | string[] | undefined = $('#eventName').val();
            const eventDescription: string | number | string[] | undefined = $('#eventDescription').val();
            const eventDate: string | number | string[] | undefined = $('#eventDate').val();
            let $table: JQuery<HTMLElement> = $('#eventsTable');
            if ($table.length === 0) {
                $table = $(
                    '<table class="table" id="eventsTable">' +
                    '   <thead>' +
                    '       <tr>' +
                    '           <th>Event Name</th>' +
                    '           <th>Description</th>' +
                    '           <th class="date-column">Date</th>' + // Add class here
                    '       </tr>' +
                    '   </thead>' +
                    '   <tbody>' +
                    '   </tbody>' +
                    '</table>');
                $('#eventTableContainer').append($table);
            }
            const $newRow = $('<tr><td>' + eventName + '</td><td>' + eventDescription + '</td><td class="date-column">' + eventDate + '</td></tr>');
            $table.find('tbody').append($newRow);
            $('#eventForm').trigger('reset');
        });
    });

    function getStatistics(responseText:string):void{

        const data = JSON.parse(responseText);
        const stats = data.statistics;
        const pieChart: HTMLElement | null = document.getElementById('pie-chart');

        // Clear out any existing content in the events container
        if (pieChart) {
            pieChart.innerHTML = '';

            stats.forEach((stats: { category: string; percent: string; colour: string }): void => {
                let chart = new Chart("pie-chart", {
                    type: "pie",
                    data: {
                        labels: stats.category,
                        datasets: [{
                            backgroundColor: stats.colour,
                            data: stats.percent
                        }]
                    }
                });
            });
        }
    }
})();
function loadHeader() {
    throw new Error('Function not implemented.');
}

function AJAX_REQUEST(arg0: string, arg1: string, processEventsData: (responseText: string) => void) {
    throw new Error('Function not implemented.');
}

