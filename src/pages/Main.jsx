import React from 'react';
import ButtonNext from '../components/ButtonNext';

// I do not like to use data-testid, but I had no chance :v
export default function main() {
  return (
    <main>
      <div>
        <p id="greeting" data-testid="greeting-element">
          Hi, I&apos;m
          <span id="my-name"> Denis</span>
        </p>
      </div>
      <ButtonNext nextPage="about" />
    </main>
  );
}
