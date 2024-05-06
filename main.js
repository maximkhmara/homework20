document.querySelector('.search-btn').addEventListener('click', function () {
	let postId = document.querySelector('#postId').value;

	if (postId < 1 || postId > 100) {
		alert('Введіть id поста від 1 до 100');
		return;
	}

	fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Сервер не відповідає');
			}
			return response.json();
		})
		.then((post) => {
			let postContainer = document.getElementById('postContainer');
			postContainer.innerHTML = '';

			let postTitle = document.createElement('h2');
			postTitle.textContent = `Пост: ${post.id}`;
			let postHeading = document.createElement('h3');
			postHeading.textContent = `Заголовок: ${post.title}`;
			let postBody = document.createElement('p');
			postBody.textContent = post.body;
			let commentsBtn = document.createElement('button');
			commentsBtn.textContent = 'Завантажити коментарі до поста';
			let commentsContainer = document.createElement('div');

			postContainer.append(
				postTitle,
				postHeading,
				postBody,
				commentsBtn,
				commentsContainer
			);

			commentsBtn.addEventListener('click', function () {
				fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
					.then((response) => response.json())
					.then((comments) => {
						commentsContainer.innerHTML = '';
						let commentsTitle = document.createElement('h3');
						commentsTitle.textContent = 'Коментарі';
						commentsContainer.appendChild(commentsTitle);
						comments.forEach((comment) => {
							let commentDiv = document.createElement('div');
							let commentName = document.createElement('h4');
							commentName.textContent = `Ім'я: ${comment.name}`;
							let commentEmail = document.createElement('p');
							commentEmail.textContent = `Email: ${comment.email}`;
							let commentBody = document.createElement('p');
							commentBody.textContent = comment.body;
							commentDiv.appendChild(commentName);
							commentDiv.appendChild(commentEmail);
							commentDiv.appendChild(commentBody);
							commentsContainer.appendChild(commentDiv);
						});
					})
					.catch((error) => {
						alert('Помилка при завантаженні коментарів.');
						console.error(error);
					});
			});
		})
		.catch((error) => {
			alert('Сервер не відповідає');
			console.error(error);
		});
});
