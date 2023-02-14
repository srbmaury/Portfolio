import React from 'react'
import Account from '../Account/Account';
import codeforces from '../../Images/codeforces.png';
import codechef from '../../Images/codechef.png';
import spoj from '../../Images/spoj.png';
import atcoder from '../../Images/atcoder.png';
import hackerrank from '../../Images/hackerrank.png';
import hackerearth from '../../Images/hackerearth.png';
import leetcode from '../../Images/leetcode.png';
import gfg from '../../Images/gfg.png';
import interviewbit from '../../Images/interviewbit.png';
import github from '../../Images/github.png';
import codepen from '../../Images/codepen.png';
import linkedin from '../../Images/linkedin.png';
import './Accounts.css';

const Accounts = () => {
    const accounts = [
        { "codeforces": [codeforces, "http://www.codeforces.com/profile/srbmaury"] },
        { "codechef": [codechef, "https://www.codechef.com/users/srbmaury"] },
        { "spoj": [spoj, "https://www.spoj.com/users/srbmaury/"] },
        { "atcoder": [atcoder, "https://atcoder.jp/users/srbmaury"] },
        { "hackerrank": [hackerrank, "https://www.hackerrank.com/saurabh_maurya_2?hr_r=1"] },
        { "hackerearth": [hackerearth, "https://www.hackerearth.com/@saurabh3518"] },
        { "leetcode": [leetcode, "https://leetcode.com/srbmaury/"] },
        { "gfg": [gfg, "https://auth.geeksforgeeks.org/user/srbmaury/"] },
        { "interviewbit": [interviewbit, "https://www.interviewbit.com/profile/saurabhmauryaece20_4823ef5eb2d2"] },
        { "github": [github, "https://github.com/srbmaury"] },
        { "codepen": [codepen, "https://codepen.io/srbmaury"] },
        { "linkedin": [linkedin, "https://www.linkedin.com/in/saurabh-maurya-39b04b205/"] }
    ];

    return (
        <>
            <div className='accounts'>Accounts</div>
            <div className='prog-div'>
                {accounts.map(account => {
                    const [key, value] = Object.entries(account)[0];
                    return <Account key={key} account={key} img={value[0]} link={value[1]} />;
                })};
            </div>
        </>
    )
}

export default Accounts
