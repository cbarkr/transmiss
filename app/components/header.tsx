'use client';

import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem  } from '@mui/base/MenuItem';

export default function Header() {
  return (
    <header className="w-full sticky top-0">
      <div className="flex flex-row justify-between items-center px-8 py-2">
        <div>
          <Link href="/" className="text-2xl hover:underline">
            transmiss
          </Link>
        </div>
        <Dropdown>
          <MenuButton>
            <MenuIcon />
          </MenuButton>
          <Menu className="rounded-lg border-solid border-2 bg-neutral-200 dark:bg-gunmetal p-2">
            <MenuItem>
              <Link href="/about" className="hover:underline text-lg mx-2">
                About
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/privacy" className="hover:underline text-lg mx-2">
                Privacy
              </Link>
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </header>
  );
}
