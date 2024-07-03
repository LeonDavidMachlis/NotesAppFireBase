export default function AppHome() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center mb-4">
            Welcome to Our Exclusive Notes App
          </h1>
          <ul className="list-group">
            <li className="list-group-item">
              Make daily reminders and never forget important tasks again!
            </li>
            <li className="list-group-item">
              Effortlessly mark tasks as completed
            </li>
            <li className="list-group-item">Easily remove completed tasks</li>
            <li className="list-group-item">
              Create unlimited reminder notes to stay organized and efficient
            </li>
          </ul>
          <div className="text-center mt-4">
            <a href="login" className="btn btn-lg btn-success">
              Get Started Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
