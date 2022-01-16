import React from "react";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="align-items-center">
          <div className="col-lg-12">
            <h1 className="font-weight-light">Home</h1>
            <div className="home_para">
              <p>What it does exactly with the inputs — that is up to you. What it returns exactly — that's up to you too.

                Now, how exactly that function checks the inputs actually depends on what you want to achieve. How exactly it represents errors? that depends on you, mostly.

                It sounds pretty generic... because there is no one True Way™ for anything.

                What we do, then, is run this function when the form submitted, and if there are errors, we somehow reflect that in the UI.</p>
              <p>You have just made a couple of forms for your app when something stroke you:

                Users are going to enter bad data into the inputs... How do I handle that?

                Because, let's face it, we don't live in a perfect world, where everyone goes by your rules, or even knows them. And would there even be forms in the perfect world if things were so perfect the website knew everything about you, already?

                So yeah, your users are going to skip some fields; enter emails without a @; use weak passwords; and not agree with the Terms of Service... But these are all crucial requirements. We need to show the users what went wrong when they enter invalid data.

                In this post, we are going to look at the most basic way to do that. It's been around for decades, you surely have seen it:

                You fill in the form, click submit, and then you either see everything went well, or see the form again, with error messages.

                For now, the errors won't be coming from the server, but instead, will be generated by our component.</p>
              <p>So you have a form
                It doesn't matter whether it's made of controlled or uncontrolled inputs. Either is fine for this technique. And the article will include examples of both.

                Ok, so the form is there. However, there still are two pieces of the puzzle missing:

                how are we going to check if the data is valid?
                how are we going to display errors, if any?
                And answers to both are going to greatly depend on your specific requirements.

                But there are pretty generic concepts and techniques for both, with I'm about to show.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;