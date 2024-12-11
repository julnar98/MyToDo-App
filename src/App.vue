<template>
	<div id="app" data-v-app="">
		<div class="flexed">
			<h1>Welcome to Julnar's <span>To-Do</span> Zone</h1> 
			<button @click="darkMode" class="theme-toggle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					:class="{ dark: isDarkMode }"
					viewBox="0 0 24 24"
					width="65"
					height="65"
					class="icon"
					>
					<g v-if="isDarkMode" fill="#ffd700">
						<circle cx="12" cy="12" r="5"></circle>
						<line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" stroke-width="1" />
						<line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" stroke-width="1" />
						<line x1="1" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="1" />
						<line x1="20" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="1" />
						<line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="currentColor" stroke-width="1" />
						<line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="1" />
						<line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="currentColor" stroke-width="1" />
						<line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="1" />
					</g>

					<g v-if="!isDarkMode" fill="none">
						<circle cx="12" cy="12" r="6" fill="currentColor"></circle>
						<circle cx="14" cy="12" r="5" fill="#ffff"></circle>
					</g>
				</svg>


			</button>
		</div>

		<dotlottie-player
			src="https://lottie.host/eea5a10c-ee07-448e-8995-8416d76ef49e/xzN79T3Nv7.lottie"
			background="transparent"
			speed="1"
			style="height: 300px; margin: auto;"
			loop
			autoplay
		></dotlottie-player>
		<form @submit.prevent="addTodo()">
			<label>New ToDo </label>
			<input
				v-model="newTodo"
				name="newTodo"
				autocomplete="off"
			>

			<button 
			class="bubbly-button" 
			@click="animateButton"
			>
			Add note!
			</button>

		</form>
		<h2>ToDo List</h2>
		<ul>
			<li
				v-for="(todo, index) in todos"
				:key="index"
			>
				<span
					:class="{ done: todo.done }"
					@click="doneTodo(todo)"
				>{{ todo.content }}</span>
				<button class="desktop" @click="removeTodo(index)">Remove</button>
				<button class="mob" @click="removeTodo(index)"></button>
			</li>
		</ul>
		<h4 v-if="todos.length === 0">No notes added!</h4>
	</div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const newTodo = ref('');
    const todos = ref(JSON.parse(localStorage.getItem('todos')) || [
      { done: false, content: 'Write a blog post' },
    ]);
	const isDarkMode = ref(false);

	function darkMode() {
		isDarkMode.value = !isDarkMode.value;
		const element = document.body;
		element.classList.toggle("dark-mode");
	}

    function addTodo() {
      if (newTodo.value) {
        todos.value.push({
          done: false,
          content: newTodo.value,
        });
        newTodo.value = '';
        saveData();
      }
    }

    function doneTodo(todo) {
      todo.done = !todo.done;
      saveData();
    }

    function removeTodo(index) {
      todos.value.splice(index, 1);
      saveData();
    }

    function saveData() {
      localStorage.setItem('todos', JSON.stringify(todos.value));
    }

    function animateButton(event) {
      const button = event.target;
      button.classList.remove('animate');
      void button.offsetWidth; // Re-trigger CSS animation
      button.classList.add('animate');
      setTimeout(() => button.classList.remove('animate'), 700);
    }

    return {
      newTodo,
      todos,
      addTodo,
      doneTodo,
      removeTodo,
      animateButton,
      darkMode,
      isDarkMode,
    };
  },
};
</script>

<style lang="scss">
$border: 1px solid
	rgba(
		$color: white,
		$alpha: 0.35,
	);
$darkborder: 1px solid
rgba(
	$color: #000,
	$alpha: 0.35,
);
$size1: 18px;
$size2: 18px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #27292d;
$lightbackgroundColor: #ffff;
$textColor: white;
$darktextColor: #070707;

$primaryColor: #e697c5;
$secondTextColor: #1f2023;
$fuschia: #e697c5;
$button-bg: $fuschia;
$button-text-color: #fff;
$baby-blue: #f8faff;
body {
	margin: 0;
	padding: 0;
  	font-family: "Athiti", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: $lightbackgroundColor;
	color: $darktextColor;
	transition: background-color 0.7s ease, color 0.7s ease;
	#app {
    	max-width: 80%;
		margin-left: auto;
		margin-right: auto;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		@media (max-width: 768px) {
		    max-width: 90%;
		}
		h1 {
			font-weight: bold;
			font-size: 33px;
			text-align: center;
  			font-family: "DynaPuff", system-ui;
			width: 100%;

			span {
				color: $primaryColor;
			}
		}
		form {
			display: flex;
			flex-direction: column;
			width: 100%;
			label {
				font-size: 22px;
				font-weight: bold;
  				font-family: "DynaPuff", system-ui;
			}
			input,
			button {
				height: $size5;
				box-shadow: none;
				outline: none;
				padding-left: $size2;
				padding-right: $size2;
				border-radius: $size1;
				font-size: 18px;
				margin-top: $size1;
				margin-bottom: $size2;
				font-family: "Athiti", sans-serif;
			}
			input {
				background-color: transparent;
				border: $darkborder;
				color: inherit;
				transition: transform 0.4s ease;

			}

		}
		form input:hover{
			transform: scale(1.01);
		}
		.flexed{
			display: flex;
			justify-content: space-between;
    		width: 100%;
		}
		button {
			cursor: pointer;
			background-color: $primaryColor;
			border: 1px solid $primaryColor;
			color: $button-text-color;
			font-weight: bold;
			outline: none;
			border-radius: $size1;
			max-width: 200px;
    		margin: 0 auto;
		}
		.bubbly-button{
			display: inline-block;
			-webkit-appearance: none;
			appearance: none;
			background-color: $button-bg;
			padding: 5px 30px;
			color: $button-text-color;
			cursor: pointer;
			position: relative;
			transition: transform ease-in 0.1s, box-shadow ease-in 0.25s, transform 0.4s ease;;
			font-family: "DynaPuff", system-ui;
			
			&:focus {
				outline: 0;
		}
  
		&:before, &:after{
			position: absolute;
			content: '';
			display: block;
			width: 140%;
			height: 100%;
			left: -20%;
			z-index: -1000;
			transition: all ease-in-out 0.5s;
			background-repeat: no-repeat;
		}
  
		&:before{
			display: none;
			top: -75%;
			background-image:  
			radial-gradient(circle, $button-bg 20%, transparent 20%),
			radial-gradient(circle,  transparent 20%, $button-bg 20%, transparent 30%),
			radial-gradient(circle, $button-bg 20%, transparent 20%), 
			radial-gradient(circle, $button-bg 20%, transparent 20%),
			radial-gradient(circle,  transparent 10%, $button-bg 15%, transparent 20%),
			radial-gradient(circle, $button-bg 20%, transparent 20%),
			radial-gradient(circle, $button-bg 20%, transparent 20%),
			radial-gradient(circle, $button-bg 20%, transparent 20%),
			radial-gradient(circle, $button-bg 20%, transparent 20%);
			background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
			//background-position: 0% 80%, -5% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 85% 30%;
		}
		&:after{
			display: none;
			bottom: -75%;
			background-image:  
			radial-gradient(circle, $button-bg 20%, transparent 20%), 
			radial-gradient(circle, $button-bg 20%, transparent 20%),
			radial-gradient(circle,  transparent 10%, $button-bg 15%, transparent 20%),
			radial-gradient(circle, $button-bg 20%, transparent 20%),
			radial-gradient(circle, $button-bg 20%, transparent 20%),
			radial-gradient(circle, $button-bg 20%, transparent 20%),
			radial-gradient(circle, $button-bg 20%, transparent 20%);
			background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
			//background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
		}
		&:active{
			transform: scale(0.9);
			background-color: darken($button-bg, 5%);
			box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
		}
		&.animate{
			&:before{
			display: block;
			animation: topBubbles ease-in-out 0.75s forwards;
			}
			&:after{
			display: block;
			animation: bottomBubbles ease-in-out 0.75s forwards;
			}
		}
	}
	
	.bubbly-button:hover{
		transform: scale(1.1);
	}


	@keyframes topBubbles {
	0%{
		background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
	}
		50% {
		background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;}
	100% {
		background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
	background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
	}
	}

	@keyframes bottomBubbles {
	0%{
		background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
	}
	50% {
		background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;}
	100% {
		background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
	background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
	}
	}
		h2 {
			font-size: 22px;
			border-bottom: $darkborder;
			padding-bottom: $size1;
			width: 100%;
  			font-family: "DynaPuff", system-ui;
		}
		ul {
			padding: 10px;
			display: grid;
			grid-template-columns: 33% 33% 33%;
			width: 100%;
			gap: 1%;
			li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border: $darkborder;
				padding: $size2 $size4;
				border-radius: $size1;
				margin-bottom: $size2;
				height: auto !important;
				text-wrap: auto;
				flex-direction: column;
    			gap: 2rem;
				transition: transform 0.3s ease;
				span {
					cursor: pointer;
					font-size: 18px;
					width: 100%;
				}
				.done {
					text-decoration: line-through;
				}
				button {
					font-size: $size2;
    				padding: 5px 30px;
					font-family: "Athiti", sans-serif;
				}
			}
			li:hover {
				transform: scale(1.03);
			}
		}
		@media (max-width: 1340px) {
			ul {
        		display: block;
			}
		}
		h4 {
			text-align: center;
			opacity: 0.5;
			margin: 0;
		}
		.mob{
			display: none;
		}
		@media (max-width: 768px) {
			h1{
			    font-size: 23px;
			}
			label, h2 {
				font-size: 18px !important;
			}
			.desktop{
				display: none;
			}
			.mob{
				display: block;
				font-size: 13px;
				padding: revert;
			}
			.mob:after{
				content: ' \2718';
			}
			#app form button , #app form input, #app ul li{
				height: 40px;
			}
			#app form button {
				width: auto;
				margin: auto;
			}
			#app ul li{
			    padding: 5px 10px;
			}
		}
	}
}
.dark-mode{
	background-color: $backgroundColor;
	color: $textColor;
	transition: background-color 0.7s ease, color 0.7s ease;
	h2{
		border-bottom: $border !important;

	}
	ul li{
		border-bottom: $border !important;
		border: $border !important;

	}
	input{
		border: $border !important;
	}
}
.theme-toggle {
	background-color: unset !important;
	border: unset !important;
	cursor: pointer;
	transition: transform 0.6s ease;
}
.theme-toggle:hover{
	transform: scale(1.3);
}
svg {
	fill: #ffd700;
	transition: fill 0.3s ease;
}
svg.dark {
	fill: #4a4a4a;
}
.icon {
  transition: transform 0.7s ease-in-out, opacity 0.5s ease-in-out;
  display: inline-block;
  color: #ffd700;
  transform: rotate(320deg);
}
.icon.dark {
  transform: rotate(180deg);
  color: #ffd700;
}
@media (max-width: 768px) {
	svg {
        width: 45px;
        height: 45px;
	}
}
</style>
