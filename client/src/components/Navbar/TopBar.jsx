import {
  RiRocket2Line,
  RiCustomerService2Line,
  RiGlobalLine,
} from "react-icons/ri";
import { LuInstagram } from "react-icons/lu";
import Container from "../Container/Container";

const TopBar = () => {
  return (
    <div className="w-full bg-indigo-700 text-white">
      <Container>
        <div className="h-9 flex items-center justify-between text-[11px]">
          <p className="font-medium">
            Empowering local skills. Building real opportunities.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-1.5">
              <RiRocket2Line size={13} />
              <span>Become an Entrepreneur</span>
            </a>

            <a href="#" className="flex items-center gap-1.5">
              <RiCustomerService2Line size={13} />
              <span>Help & Support</span>
            </a>

            <div className="flex items-center gap-3 border-l border-white/30 pl-4">
              <LuInstagram
                size={16}
                className="cursor-pointer transition hover:text-pink-400"
              />
              <RiGlobalLine
                size={16}
                className="cursor-pointer transition hover:text-blue-300"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopBar;
