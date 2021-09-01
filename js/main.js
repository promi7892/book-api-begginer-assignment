const loadBooks = () => {
	const searchField = document.getElementById('search-input');
	const searchText = searchField.value;
	// searchField.value = '';

	// fetch('http://openlibrary.org/search.json?q=javascript')
	fetch(`http://openlibrary.org/search.json?q=${searchText}`)
		.then((response) => response.json())
		.then((data) => displayAll(data.docs));
	// .then((data) => console.log(data.docs[0]));
};
const displayAll = (bookDetails) => {
	// console.log(books);
	const displayResult = document.getElementById('display-result');
	bookDetails.forEach((book) => {
		const bookDetailDiv = document.createElement('div');
		bookDetailDiv.classList.add('col');
		bookDetailDiv.innerHTML = `
		     <div class="card h-100">
		<img class="card-img-top img-fluid"
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
                        ${book.publisher ? book.publisher : 'Unavailable'}</p>
                        <p><b>Related Tags:</b> <br>
                        ${
													book.subject
														? book.subject.slice(1, 5)
														: 'Noting Related'
												}</p>
		            </div>
		    `;
		displayResult.appendChild(bookDetailDiv);
	});
};
