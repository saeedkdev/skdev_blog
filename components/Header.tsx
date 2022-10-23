import Link from 'next/link'
import { FiGithub } from 'react-icons/fi'

function Header() {
  return (
	<header className="flex justify-between p-5 max-w-7xl mx-auto">
		<div className="flex items-center space-x-5">
			<Link href="/">
				{/* <img className="w-44 object-contain cursor-pointer" src="/skdev-sm.png" alt="skdev-blog" /> */}
				<h1 className="text-4xl cursor-pointer font-serif">skdev</h1>
			</Link>
			<div className="hidden md:inline-flex items-center space-x-5">
				<Link href="/">
					<h3 className="cursor-pointer">About</h3>
				</Link>
				<Link href="http://instagram.com/sk.developer">
					<h3 className="cursor-pointer">Contact</h3>
				</Link>
				<Link href="/about">
					<h3 className="invisible text-white bg-green-600 px-4 py-1 rounded-full">Follow</h3>
				</Link>
			</div>
		</div>
		<div className="flex items-center space-x-5 text-slate-600">
			<a target="_blank" href="http://github.com/saeedkdev" className="border px-4 py-1 flex rounded-full border-slate-600 hover:bg-slate-600 hover:text-white transition">
				<FiGithub className="mt-1 mr-2" />  saeedkdev
			</a>
		</div>
	</header>
  );
}

export default Header;
