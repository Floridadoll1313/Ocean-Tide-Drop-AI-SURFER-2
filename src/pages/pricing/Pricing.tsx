              ))}
            </ul>

            <Link
              to={`/pricing/${key}`}
              className="block mt-8 text-center rounded-xl bg-cyan-400 text-black py-3 font-bold"
            >
              Choose {plan.label}
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}
