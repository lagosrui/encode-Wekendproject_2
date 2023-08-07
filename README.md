#Function Ballot Report

<p>Functions Ballot.sol report:</p>

<p>giveRightToVote(address voter): Allows the chairperson to give voting rights to an address. Requires that the address has not voted before and has a weight of 0.</p>

<p>delegate(address to): Allows a voter to delegate their vote to another address. Handles potential delegation loops and checks the weight of the delegate.</p>

<p>vote(uint proposal): Allows a voter to cast their vote for a proposal. Validates the voter's rights and the validity of the proposal.</p>

<p>winningProposal(): A view function that computes and returns the index of the winning proposal based on vote counts.</p>

<p>winnerName(): A view function that returns the name of the winning proposal.</p>


![image](https://github.com/lagosrui/encode-Wekendproject_2/assets/36866655/e06f8537-7a99-480c-97f0-dd79369f1fe5)

![image](https://github.com/lagosrui/encode-Wekendproject_2/assets/36866655/187fb69b-1ded-42e8-83c9-df4341a7be23)


Contract :



#   e n c o d e - W e k e n d p r o j e c t _ 2 
 
 
