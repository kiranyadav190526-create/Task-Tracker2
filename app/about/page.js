export const metadata = {
  title: "About | Task Tracker",
};

export default function AboutPage() {
  return (
    <main className="app-shell section">
      <p className="eyebrow">About</p>
      <h1>Built for the Next.js task tracker assignments.</h1>
      <p className="lead">
        This project starts with the fundamentals from Assignment 1 and upgrades
        them with the routing, dynamic pages, CRUD operations, persistence, and
        cleaner structure requested in Assignment 2.
      </p>

      <div className="about-grid" style={{ marginTop: 28 }}>
        <section className="panel">
          <h2>Features</h2>
          <p className="muted">
            Add tasks, edit details, mark items complete or pending, delete with
            confirmation, filter by status, search, sort, and open a dedicated
            page for every task.
          </p>
        </section>

        <section className="panel">
          <h2>Concepts Practiced</h2>
          <p className="muted">
            Components, props, useState, event handling, conditional rendering,
            arrays, objects, map, filter, immutable updates, localStorage, and
            Next.js App Router.
          </p>
        </section>
      </div>
    </main>
  );
}
