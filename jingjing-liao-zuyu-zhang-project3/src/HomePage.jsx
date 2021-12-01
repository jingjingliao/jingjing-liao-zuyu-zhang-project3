import "./css/HomePage.css";

export default function HomePage() {
  return (
    <div class="container">
      <img
        class="nav-img"
        src="https://images.creativemarket.com/0.1.0/ps/5261195/910/607/m1/fpnw/wm0/job-search-.jpg?1540456875&s=cc4077264458791bd7f44a0a1b4b40b4&fmt=webp"
        alt=""
      />

      <form method="#">
        <input type="text" class="textbox" placeholder="Search Jobs" />
        <input title="Search" value="Search" type="submit" class="button" />
      </form>
    </div>
  );
}
