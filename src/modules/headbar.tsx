import { useState } from 'react';

export default function Headbar() {


  return (
    <div className="fixed">
      <div className="flex w-screen items-center justify-between gap-5 py-2 px-2">
        {/*Hamburger*/}
        <div className="flex items-center gap-4">
          <button className="items-center flex flex-col rounded-full gap-1 p-4 hover:bg-stone-100">
            <svg className=" w-6 h-6"><path d="M20 5H4a1 1 0 000 2h16a1 1 0 100-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Z"></path></svg>
          </button>
          <a href="#" className="logo">Youtube</a>
        </div>
        <form className="flex gap-1">
          <input type="search" className="outline rounded-full px-4 py-2" />
          {/*TODO: Replace with SVG*/}
          <a type="submit" className="outline rounded-full p-2 hover:bg-slate-100">🔍</a>
        </form>
        <div className="flex">
          <NavItem icon="">
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </div>
      </div>
      {/*TODO: Home only tags + programatically add them based on databases*/}
      <div className="flex gap-1 py-4 overflow-scroll whitespace-nowrap ml-24 w-[90vw]">
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>All</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Gaming</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Podcasts</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Inventions</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Grilling</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Combat sports</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Experiments</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Restraunts</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Tents</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Live</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>AI</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Basketball</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Baking</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Computers</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Sheikh</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Comedy</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Nature</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Role-Playing Games</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Information</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>Recently uploaded</p>
        </div>
        <div className="px-2 py-1 w-fit rounded-lg bg-stone-100">
          <p>New to you</p>
        </div>
      </div>
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="border w-10 h-10 rounded-full" onClick={() => setOpen(!open)}>
        {props.icon}
      </button>
      {open && props.children}
    </div>
  );
}

function DropdownMenu() {
  function DropdownItem(props) {
    return (
      <a href="#" className="w-full flex">
        <span className="">{props.leftIcon}</span>
        {props.children}
        <span className="">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="rounded-xl absolute right-3 flex flex-col bg-white w-70 drop-shadow-sm">
      <DropdownItem>
        <div className="px-5 py-2 flex">
          <svg className="flex w-10 h-10 rounded-full border mr-2"></svg>
          <div className="flex flex-col text-start">
            <p className="">John Doe</p>
            <p className="text-xs">JohnDoe@Example.com</p>
            <button className="text-xs text-blue-800 text-start hover:text-blue-600">
              <p className="my-2">Create a channel</p>
            </button>
          </div>
        </div>
      </DropdownItem>
      <hr className="border-stone-300" />
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Google Account</p>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Switch account</p>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Sign out</p>
        </button>
      </DropdownItem>
      <hr className="border-stone-300" />
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>YouTube Studio</p>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Purchase memberships</p>
        </button>
      </DropdownItem>
      <hr className="border-stone-300" />
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Your data in YouTube</p>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Appearance: Device theme</p>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Language: English</p>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Restricted Mode: Off</p>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Location: United States</p>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Keyboard shortcuts</p>
        </button>
      </DropdownItem>
      <hr className="border-stone-300" />
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Settings</p>
        </button>
      </DropdownItem>
      <hr className="border-stone-300" />
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Help</p>
        </button>
      </DropdownItem>
      <DropdownItem>
        <button className="px-5 py-2 w-full text-start hover:bg-stone-100">
          <p>Send feedback</p>
        </button>
      </DropdownItem>
    </div>
  );
};
