const $textarea = document.querySelector('textarea');
const $count = document.querySelector('#count');
const $form = document.querySelector('form');
const $bluesky = document.querySelector('#bluesky');
const $x = document.querySelector('#x');
const $share = document.querySelector('#share');

function applyTextChange() {
  $count.textContent = Array.from($textarea.value).length;
  // https://docs.bsky.app/docs/advanced-guides/intent-links
  $bluesky.href = `https://bsky.app/intent/compose?text=${$textarea.value}`;
  // https://developer.x.com/en/docs/x-for-websites/tweet-button/guides/web-intent
  $x.href = `https://twitter.com/intent/tweet?text=${$textarea.value}`;
}

$textarea.addEventListener('input', () => {
  applyTextChange();
});

$share.addEventListener('click', async () => {
  await navigator.share({
    text: $textarea.value
  });
});

const {searchParams: params} = new URL(location.href);
const items = [params.get('title') ?? '', params.get('text') ?? ''];
$textarea.value = items.join(' ');
applyTextChange();
