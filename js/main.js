// Load data on click

const loadBooks = () => {
	const searchField = document.getElementById('search-input');
	const searchText = searchField.value;
	const url = `http://openlibrary.org/search.json?q=${searchText}`;
	searchField.value = '';
	if (searchText === '') {
		alert('Please type the book name you are looking for');
		displaySpinner('none');
	} else {
		fetch(url)
			.then((response) => response.json())
			.then((data) => displayAll(data.docs))
			.finally(() => searchText === '');
		displaySpinner('block');
	}
	// Display count for search  books
	fetch(url)
		.then((response) => response.json())
		.then((data) => found(data));
};

const found = (total) => {
	let count = document.getElementById('count');
	if (total.numFound === 0) {
		count.innerHTML = `No Result Found`;
	} else {
		count.innerHTML = `Total Matched With ${total.num_found} Books`;
	}
};

// display all information in a card
const displayAll = (bookDetails) => {
	const displayResult = document.getElementById('display-result');
	// count.innerHTML = `Total books found ${bookDetails.length} `;
	displayResult.textContent = '';
	bookDetails.forEach((book) => {
		const bookDetailDiv = document.createElement('div');
		bookDetailDiv.classList.add('col');
		bookDetailDiv.innerHTML = `
		     <div class="card h-100 shadow ">
		<img class="card-img-top img-fluid h-50 w-75 mx-auto m-4 shadow-lg"
        src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
		            <div class="card-body">
		                <h3 class="card-title">${book.title}</h3>
                        <br>
                       <p><b>Author Name: </b>
                       ${book.author_name} </p>
                        
                        <p><b>Publication On: </b>
                        ${
													book.first_publish_year
														? book.first_publish_year
														: 'Information Unavailable'
												} 
                                                </p>
                        <p><b>Publisher Name: </b>
                        ${
													book.publisher ? book.publisher : 'No information'
												}</p>
                        <p><b>Related Tags:</b> <br>
                        ${
													book.subject
														? book.subject.slice(1, 5)
														: 'Nothing is related'
												}</p>
		            </div>
		    `;
		displayResult.appendChild(bookDetailDiv);
	});
	displaySpinner('none');
};

// spinner function
const displaySpinner = (viewOnPage) => {
	const spinner = document.getElementById('spinner');
	spinner.style.display = viewOnPage;
};
