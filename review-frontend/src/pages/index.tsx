import { AppBar } from "@/components/AppBar";
import ReviewCard from "@/components/ReviewCard";
import { useEffect, useState } from "react";
import { Review } from "@/models/Review";
import * as web3 from "@solana/web3.js";
import { fetchReviews } from "@/util/fetchReviews";
import { useWallet } from "@solana/wallet-adapter-react";
import ReviewForm from "@/components/Form";
import Logo from "@/components/Logo";

//Replace with your own Program_id
const REVIEW_PROGRAM_ID = "CmMbZTFZSHk1vAtGb1RCn4ueJBcHLr8uqsndJSoCHN1t";

export default function Home() {

    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    const { publicKey, sendTransaction } = useWallet();

    const [txid, setTxid] = useState("");
    const [reviews, setReviews] = useState<Review[]>([]);

    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        const fetchAccounts = async () => {
            await fetchReviews(REVIEW_PROGRAM_ID, connection).then(setReviews);
        };
        fetchAccounts();
    }, []);

    const handleSubmit = () => {
        const review = new Review(title, rating, description, location);
        handleTransactionSubmit(review);
    };

    const handleTransactionSubmit = async (review: Review) => {
        if (!publicKey) {
            alert("Please connect wallet");
            return;
        }
        const buffer = review.serialize();
        const transaction = new web3.Transaction();

        const [pda] = await web3.PublicKey.findProgramAddressSync(
            [publicKey.toBuffer(), Buffer.from(review.title)],
            new web3.PublicKey(REVIEW_PROGRAM_ID)
        );

        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    pubkey: publicKey,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: web3.SystemProgram.programId,
                    isSigner: false,
                    isWritable: false,
                }
            ],
            data: buffer,
            programId: new web3.PublicKey(REVIEW_PROGRAM_ID),
        });
        transaction.add(instruction);

        try {
            let txId = await sendTransaction(transaction, connection);
            setTxid(` https://explorer.solana.com/tx/${txId}?cluster=devnet`);
        } catch (error) {
            console.log(JSON.stringify(error));
            alert(JSON.stringify(error));
        }
    };

    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 `}>
             <div className="z-10 max-w-5xl w-full items-left justify-between font-mono text-sm lg:flex">
                <Logo width="563px" height="968px" altText="Group6 logo" />
            </div>

            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <AppBar />
            </div>

            <div className="after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
                <ReviewForm
                    title={title}
                    description={description}
                    rating={rating}
                    location={location}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    setRating={setRating}
                    setLocation={setLocation}
                    handleSubmit={handleSubmit}
                />
            </div>

            {txid && <p>Transaction submitted: <a href={txid} target="_blank">{txid}</a></p>}

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
                {reviews &&
                    reviews.map((review) => {
                        return (
                            <ReviewCard key={review.title} review={review} />
                        );
                    })}
            </div>
        </main>
    );
}
