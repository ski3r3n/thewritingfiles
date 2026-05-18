import Sidebar from "@/components/sidebar";
import Link from "next/link";
export default function Writing() {
  // TODO: fetch and display the writing content based on writingid, blank as placeholder for now
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="overflow-y-auto h-screen p-10">
          <h1 className="text-3xl font-bold mb-4">My Writing</h1>
          <div className="flex gap-4 mb-6">
            <Link
              href="/dashboard/profile/fufu"
              className="flex items-center gap-2"
            >
              {" "}
              {/* placeholder link, doesnt even work */}
              <h2 className="text-xl text-gray-400">By: Fu Fu</h2>
            </Link>
            <h2 className="text-xl text-gray-400">Date: 12/25/25</h2>
          </div>
          <p className="text-lg w-full whitespace-pre-wrap">
            {`My hand has a mind of its own. “Will is a way.” Dull sparks ignite and vanish into air. Fireworks prevail, but their sparks ignite the cloth below. People laugh then scream in terror. Sleep that lasts too long is deserving of an ambulance. Everything is flammable, I know better than to play with fire. Dull sparks ignite, but vanish into air. Sometimes, I look up into the sky, an arsonist, ready to leap to another planet. The world goes up in smoke. However, neither can I fly, nor can I do rocket science.

My hand has a mind of its own. Will is a way, and a waste of will is the gouging of eyes. Epiphyllum flowers bloom beautifully and die in an instant. I sit and mourn the ash that come of. Rain pours, but stops when it waters the plants, but continues when I'm wet. My mind is set ablaze, then extinguished by my hands. Miraculous.

My hand has a mind of its own. They no longer move. My muscles have atrophied past the point of regular sensation. Sometimes, I try, I can't help but stare, and wait. And when I wait, people scream in my ears till they bleed. Will is a way, a waste of will is a gouging of eyes, and the absence is a way to waste eyes. Sometimes, I stare till I lose my vision, but they never move.

My hand sees visions of another place. It is willed by the strength of the mind, but it is restrained by its ability, it wants and wants, with such an endless ambition, till it gouges its own eyes. I love my hands.`}
          </p>
        </div>
      </div>
    </>
  );
}
