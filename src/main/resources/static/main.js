function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function showComments(CommentButton) {
    const post_id = CommentButton.getAttribute('data-post-id');
    var comment_id = (post_id * -1)
    document.getElementById(comment_id).classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", () => {
    // Find all like buttons
    const likeButtons = document.querySelectorAll('.Like');
    likeButtons.forEach(button => {
        // Check the data-is-liked attribute
        const isLiked = button.getAttribute('data-is-liked') === 'true';

        // Update the button's appearance
        if (isLiked) {
            button.classList.add('liked');
            button.innerHTML = `❤ (${likeCount})`; // Set to "liked" state

        } else {
            button.classList.remove('liked');
            button.innerHTML = `♡ (${likeCount})`; // Set to "unliked" state

        }
    });
});


window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function searchFunction() {
    const elements = document.getElementsByClassName("Post");
    let search = document.getElementById("searchbar").value.toLowerCase();

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const textContent = element.textContent.toLowerCase();

        if (search === "" || textContent.includes(search)) {
            element.classList.remove("hide");
        } else {
            element.classList.add("hide");
        }
    }
}


async function likePost(likeButton) {
    // Find the parent .Post element
    const postElement = likeButton.closest('.Post');
    if (!postElement) {
        console.error('Post element not found for like button:', likeButton);
        return;
    }

    // Get the post ID
    const postId = postElement.getAttribute('data-post-id');
    if (!postId) {
        console.error('Post ID not found on element:', postElement);
        return;
    }

    const isLiked = likeButton.classList.contains('liked');

    try {
        const method = isLiked ? 'DELETE' : 'POST';
        const url = isLiked ? `/unlike/${postId}` : `/like/${postId}`;

        const response = await fetch(url + `?userId=${userId}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const { likeCount } = await response.json();

            // Update button appearance
            if (isLiked) {
                likeButton.classList.remove('liked');
                likeButton.innerHTML = `♡ (${likeCount})`;
            } else {
                likeButton.classList.add('liked');
                likeButton.innerHTML = `❤️ (${likeCount})`;
            }
        } else {
            console.error(`Failed to update like status for post ${postId}`);
        }
    } catch (error) {
        console.error('Error updating like status:', error);
    }
}