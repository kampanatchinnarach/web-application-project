import './Account.css'
import { Link } from 'react-router-dom';

function Account(){
    return(
     <body>
        <article className='container'>
            <h1 className='header'>ACCOUNT</h1>
                   
            <div id='choice1' onClick={() => document.querySelector('a').click()}>
                <i class="fa-solid fa-user" />
                <Link className='text-a' to='/'>Personal information</Link>
            </div>
            <div id='choice2' onClick={() => document.querySelector('a').click()}>
                 <i class="fa-solid fa-store"/>
                <Link className='text-a' to='/'>ผู้ให้บริการ</Link>
            </div>

            <div id='choice3' onClick={() => document.querySelector('a').click()}>
                 <i class="fa-solid fa-cart-shopping" id='imgBar'/>
                <Link className='text-a' to='/'>ผู้ใช้บริการ</Link>
            </div>
            <div id='choice4' onClick={() => document.querySelector('a').click()}>
                 <i class="fa-solid fa-list"/>
                <Link className='text-a' to='/'>status</Link>
            </div>
            <div id='choice5' onClick={() => document.querySelector('a').click()}>
                <i class="fa-solid fa-right-from-bracket"/>
                <Link className='text-a' to='/'>Log out</Link>
            </div>
        
        </article>
        </body>
    )
}

export default Account;